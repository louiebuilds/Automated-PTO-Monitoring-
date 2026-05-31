function main(workbook: ExcelScript.Workbook) {
    // Change this if your sheet name is different
    const sheetName = "Sheet1";
    const ws = workbook.getWorksheet(sheetName);

    if (!ws) {
        return {
            success: false,
            message: `Worksheet '${sheetName}' not found.`,
            items: []
        };
    }

    const usedRange = ws.getUsedRange();
    if (!usedRange) {
        return {
            success: false,
            message: "No used range found.",
            items: []
        };
    }

    const rowCount = usedRange.getRowCount();
    const colCount = usedRange.getColumnCount();

    // Based on your file:
    // Row 2 = dates
    // Row 3 = day names
    // Column A = employee name
    // Data starts around column D and employee rows start at row 4
    const DATE_ROW = 1;   // zero-based index => Excel row 2
    const DAY_ROW = 2;    // zero-based index => Excel row 3
    const FIRST_EMPLOYEE_ROW = 3; // zero-based index => Excel row 4
    const EMPLOYEE_COL = 0; // column A
    const FIRST_SCHEDULE_COL = 3; // column D

    let results: {
        employeeName: string;
        ptoRequestDate: string;
        dayOfWeek: string;
        notes: string;
        cellAddress: string;
    }[] = [];

    for (let r = FIRST_EMPLOYEE_ROW; r < rowCount; r++) {
        const employeeName = ws.getCell(r, EMPLOYEE_COL).getText().trim();

        // Skip blank rows or legend rows
        if (!employeeName || employeeName.toUpperCase().includes("RED = PTO")) {
            continue;
        }

        for (let c = FIRST_SCHEDULE_COL; c < colCount; c++) {
            const cell = ws.getCell(r, c);
            const cellText = cell.getText().trim();
            const fontColor = (cell.getFormat().getFont().getColor() || "").toUpperCase();

            // Match PTO text + red font
            const containsPTO = cellText.toUpperCase().includes("PTO");
            const isRed =
                fontColor === "#FF0000" ||
                fontColor === "FF0000" ||
                fontColor === "#FFFF0000" ||
                fontColor === "FFFF0000";

            if (containsPTO && isRed) {
                const dateText = ws.getCell(DATE_ROW, c).getText().trim();
                const dayText = ws.getCell(DAY_ROW, c).getText().trim();

                results.push({
                    employeeName: employeeName,
                    ptoRequestDate: dateText,
                    dayOfWeek: dayText,
                    notes: cellText,
                    cellAddress: cell.getAddress()
                });
            }
        }
    }

    return {
        success: true,
        count: results.length,
        items: results
    };
}
