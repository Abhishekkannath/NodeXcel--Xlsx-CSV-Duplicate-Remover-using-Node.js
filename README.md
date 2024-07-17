# Node.js Excel CSV Duplicate Remover

## Overview
The Node.js Excel CSV Duplicate Remover is a versatile tool designed to efficiently remove duplicate entries from CSV files while offering customizable merge strategies.

## Features
- **Duplicate Removal:** Remove duplicate rows based on specified unique identifiers.
- **Merge Options:** Merge duplicate entries using flexible strategies.
- **Node.js Powered:** Built using Node.js for performance and cross-platform compatibility.
- **Configurability:** Customize unique and merge criteria through configuration files.
- **Scalability:** Handles large datasets efficiently.

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

| Sr | Phone  | Dr  | Due  |
|----|--------|-----|------|
| 1  | 1233   | 5000| 3233 |
| 2  | 4567   | 9000| 423  |
| 3  | 1233   |     | 9345 |

Create an Excel file for your account book records with the following structure:

| Sr | Phone  | Dr  | Due        |
|----|--------|-----|------------|
| 1  | 1233   | 5000| 3233, 9345 |
| 2  | 4567   | 9000| 423        |
|    |        |     |            |

Clone this repository.

Install Node.js from [nodejs.org](https://nodejs.org/).

Navigate to the project root directory and run:

1. Prepare your files as described in the Detailed Setup section.
2. Clone this repository.
3. Navigate to the project root directory and run the following commands:


`npm install`
`npm run dev`


Open your web browser and go to: [http://localhost:5000/](http://localhost:5000/)

**Output:**

After running the tool, the resulting file will remove duplicate entries from the records, leaving you with unique records.

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

https://github.com/Abhishekkannath/

