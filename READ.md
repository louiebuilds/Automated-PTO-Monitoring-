# Automated PTO Monitoring & Teams Notification System

## 📌 Overview
This project automates the extraction of PTO (Paid Time Off) entries from a structured Excel schedule and posts real-time notifications to Microsoft Teams.

The solution leverages:
- Power Automate (cloud workflows)
- Office Scripts (TypeScript)
- Microsoft Teams integration

---

## 🎯 Problem
The team used a manually maintained Excel schedule where PTO entries were displayed as red text in a grid-based format. 

Challenges:
- No structured table format
- PTO data embedded within a matrix layout
- Manual effort required to monitor PTO changes
- Lack of automated communication

---

## 🚀 Solution
Built an automated pipeline that:

1. Runs on a scheduled basis (twice weekly)
2. Executes an Office Script to:
   - Scan the Excel grid
   - Identify PTO entries based on:
     - Text matching ("PTO")
     - Font color detection (red)
   - Extract:
     - Employee name
     - PTO date
     - Notes
3. Returns structured JSON output
4. Uses Power Automate to:
   - Parse JSON results
   - Build a formatted message
   - Post updates to Microsoft Teams

---

## 🔧 Technologies Used
- Power Automate
- Office Scripts (TypeScript)
- Microsoft Teams API (via connector)
- Excel Online (Business)

---

## 🧠 Key Features
- Dynamic data extraction from non-tabular Excel structure
- Conditional filtering (text + formatting detection)
- Automated message composition
- Scheduled execution (no manual intervention)
- Integration across Microsoft 365 services

---

## 📸 Screenshots
Include:
- Excel schedule (with PTO highlighted)
- Office Script code
- Power Automate flow design
- Teams output message

---

## 🏗️ Architecture
