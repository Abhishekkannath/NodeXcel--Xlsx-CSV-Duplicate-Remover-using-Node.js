# Bank Reconciliation and Data Deduplication Tool

This web application automates the reconciliation process between your bank records and your account book records. It identifies and removes duplicate entries, streamlining the end-of-month reconciliation process.

## Features

- **Automated Reconciliation**: Compares and matches entries between bank records and account book records.
- **Data Deduplication**: Eliminates duplicate records from your files.
- **File Merging**: Combines results and outputs in Excel or CSV format.

## Prerequisites

To run this project, ensure you have the following:

- Node.js (Download from [nodejs.org](https://nodejs.org/en/download))
- An .XLSX file containing bank records
- An .XLSX file containing account book records

## Quick Start Guide

### Easy Setup:

Open your web browser and visit: [http://localhost:5000/](http://localhost:5000/)

**Detailed Setup:**

Create an Excel file for your bank records with the following structure:

| Sr | Cheque | Dr  | Cr   |
|----|--------|-----|------|
| 1  | 123    | 5000|      |
| 2  | 4567   | 9000|      |
| 3  |        |     |-9345|

Create an Excel file for your account book records with the following structure:

| Sr | Cheque | Dr  | Cr   |
|----|--------|-----|------|
| 1  | 123    | 5000|      |
| 2  | 4567   | 9000|      |
| 3  |        |     |-9345|
| 4  | 34637  | 8000|      |

Clone this repository.

Install Node.js from [nodejs.org](https://nodejs.org/).

Navigate to the project root directory and run:

1. Prepare your files as described in the Detailed Setup section.
2. Clone this repository.
3. Navigate to the project root directory and run the following commands:

```bash
npm install
npm run dev


Open your web browser and go to: [http://localhost:5000/](http://localhost:5000/)

**Output:**

After running the tool, the resulting file will have duplicate entries removed from both the bank records and account book records, leaving you with unique records for manual reconciliation.

**Important Notes:**

- The order of columns must be maintained.
- Column names must match exactly as shown above.
- Sample files can be found in the `public/samples` folder for reference.

**Technologies Used:**

- SheetJs for handling Excel files.
- Bootstrap 5 for the front-end design.
- Node.js, Express.js, and EJS for server-side and template rendering.


**Support:**

If you find this project useful, consider buying me a coffee:

