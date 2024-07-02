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

1. Prepare your files as described in the Detailed Setup section.
2. Clone this repository.
3. Navigate to the project root directory and run the following commands:
   ```bash
   npm install
   npm run dev
