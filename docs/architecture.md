
# 🏗️ Architecture – PTO Automation System

## 📌 Overview
This document defines the architecture of the PTO Automation System, which extracts PTO entries from an Excel-based scheduling workbook and delivers automated notifications to Microsoft Teams using Microsoft 365 services.

The system is designed to handle **non-tabular, matrix-based data structures**, making it suitable for real-world operational workflows where structured data models are not available.

---

## 🔷 High-Level Architecture
+------------------------+
|  Excel Schedule File   |
|  (Matrix Layout)       |
+-----------+------------+
|
│
▼
+------------------------+
|  Office Script         |
|  (Data Extraction)     |
+-----------+------------+
|
│ JSON Output
▼
+------------------------+
|  Power Automate Flow   |
|  (Workflow Engine)     |
+-----------+------------+
|
│ Process & Format
▼
+------------------------+
|  Microsoft Teams       |
|  (Notification Layer)  |
+------------------------+

## 🔷 System Components

### 1. Excel Schedule (Data Source)

**Type:** Unstructured / Matrix Layout  
**Platform:** Excel Online (Business)

#### Structure:
- Row 1–2: Date headers
- Row 2–3: Day of week
- Column A: Employee names
- Grid cells: Schedule data

#### Characteristics:
- PTO entries embedded within cells
- PTO is identified by:
  - Text: `"PTO"`
  - Formatting: red font color
- No table structure → requires custom parsing logic

---

### 2. Office Script (Data Extraction Layer)

**Language:** TypeScript (Office Scripts)  
**Execution:** Triggered via Power Automate

#### Responsibilities:
- Access worksheet using ExcelScript API
- Identify used range dynamically
- Iterate through:
  - employee rows
  - schedule columns
- Detect PTO entries using:
  - string matching (`"PTO"`)
  - font color (`#FF0000`)

#### Data Mapping Logic:
| Source | Mapping |
|------|--------|
| Row index | Employee Name |
| Column index | Date |
| Cell value | PTO / Notes |

#### Output Format:
Returns structured JSON:

```json
{
  "success": true,
  "count": 3,
  "items": [
    {
      "employeeName": "Louis Vandermolen",
      "ptoRequestDate": "6/19/2026",
      "dayOfWeek": "Fri",
      "notes": "PTO"
    }
  ]
}
