
 🚀 Automated PTO Monitoring & Teams Notification System

## 📌 Overview
This project automates the extraction of PTO (Paid Time Off) entries from a schedule-based Excel workbook and posts structured notifications to Microsoft Teams using Power Automate and Office Scripts.

The solution addresses a real-world scheduling challenge where PTO entries are embedded in a matrix-style Excel sheet rather than a structured table. Instead of manual monitoring, this automation detects PTO entries dynamically based on both text content and formatting, then delivers actionable updates directly to Microsoft Teams.

---

## 🎯 Business Problem
The scheduling workbook was maintained in a grid format:

- Dates were stored across column headers
- Employee names were stored in rows
- PTO entries were embedded directly in cells
- PTO was visually indicated using red text formatting

### Challenges:
- ❌ Data was not structured in a table format
- ❌ Manual review was required to identify PTO
- ❌ No automated communication to Teams
- ❌ High risk of missed or delayed PTO visibility

---

## 💡 Solution
A fully automated pipeline was created using Microsoft 365 tools:

### 🔄 Workflow
1. A **scheduled Power Automate flow** runs twice weekly
2. The flow executes an **Office Script** in Excel Online
3. The script:
   - scans the worksheet dynamically
   - detects `PTO` entries by:
     - text matching
     - red font color detection
   - maps each PTO entry to:
     - employee name
     - schedule date
     - day of week
     - notes within the cell
4. The script returns structured JSON data
5. Power Automate:
   - parses the JSON output
   - builds a formatted message
6. The message is automatically posted to a **Microsoft Teams channel**

---

## 🧠 Key Features

- ✅ Automated detection of PTO entries
- ✅ Works with **non-tabular Excel layouts**
- ✅ Uses formatting logic (red text detection)
- ✅ Converts data into structured JSON
- ✅ Scheduled execution (fully automated)
- ✅ Seamless Microsoft Teams integration
- ✅ Reusable automation pattern

---

## 🛠️ Technologies Used

- **Power Automate**
- **Office Scripts (TypeScript)**
- **Excel Online (Business)**
- **Microsoft Teams Connector**
- **JSON Data Processing**

---

## ⚙️ Technical Highlights

### 📄 Office Script Logic
The Office Script was designed to handle unstructured data scenarios:

- Reads full worksheet range dynamically
- Iterates row-by-row and column-by-column
- Detects PTO entries using:
  - string matching (`"PTO"`)
  - font color validation (`#FF0000`)
- Maps grid data relationships:
  - row → employee
  - column → date
- Outputs structured JSON:
  
```json
{
  "employeeName": "Louis Vandermolen",
  "ptoRequestDate": "6/19/2026",
  "dayOfWeek": "Fri",
  "notes": "PTO"
}
