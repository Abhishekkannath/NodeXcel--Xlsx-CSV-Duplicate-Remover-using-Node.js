const express = require("express");
const router = express.Router();
const multer = require("multer");

const XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");
const readline = require("readline");

const upload = multer({ dest: "public/uploads/" });

let totalBankRows = 0;
let totalLocalRows = 0;
let isBankFileReady = false;
let isLocalFileReady = false;
let isDownloadReady = false;
let isDonateReady = false;
let isexcel = false;
let iscsv = false;
//Routes
const dataA = [];
var Unique_1="custom_var1"
var Merge_1="phone_number";
var Unique_2="custom_var1"
var Merge_2="phone_number";



router.get("/", (req, res) => {
  res.render("index", {
    successMessage: req.flash("success"),
    localMessage: req.flash("successLocal"),
    dupMessage: req.flash("dupMessage"),
    fileSuccessMsg: req.flash("fileSuccessMessage"),
    error: null,
    totalBankRows,
    totalLocalRows,
    isBankFileReady,
    isLocalFileReady,
    isDownloadReady,
    isexcel,
    iscsv,
    isDonateReady,
  });
  totalBankRows = 0;
  totalLocalRows = 0;
});

//upload bank excel file
router.post("/uploadBank", upload.single("file"), (req, res) => {
  if (!req.file) {
    res.status(400).send("No file uploaded.");
    return;
  }
   Unique_1=req.body.Unique1;
   Merge_1=req.body.Merge1;

  const filePath = req.file.path;
  // Check if the file has an Excel extension
  const fileExtension = path.extname(req.file.originalname).toLowerCase();
  if (fileExtension !== ".csv") {
    // Delete the uploaded file
    fs.unlinkSync(filePath);
    res.render("index", { error: "only csv files are supported!" });
    res.redirect("/");
    return;
  }

  // Rename the file

  const newFileName = "bankbook" + fileExtension;
  const newFilePath = path.join(path.dirname(filePath), newFileName);

  // Delete the previous file if it exists
  if (fs.existsSync(newFilePath)) {
    fs.unlinkSync(newFilePath);
  }

  // Rename the uploaded file
  if (newFilePath) {
    fs.renameSync(filePath, newFilePath);
  }

// Parse CSV file to JSON array

const rl = readline.createInterface({
  input: fs.createReadStream(newFilePath),
  crlfDelay: Infinity, // Handle different line endings
});

let headers;
rl.on("line", (line) => {
  const row = line.split(",");
  if (!headers) {
    headers = row;
  } else {
    dataA.push(Object.fromEntries(row.map((value, index) => [headers[index], value])));
  }
});

rl.on("close", () => {
  const rowCount = dataA.length;
  totalBankRows += rowCount;
  isBankFileReady = true;
  iscsv=true;
});

  // console.log("Total rows: ", rowCount);

  req.flash("success", "CSV File uploaded successfully");
  res.redirect("/");
  // Do something with the sheet data
});




//upload excel file local
router.post("/uploadLocal", upload.single("file"), (req, res) => {
  if (!req.file) {
    res.status(400).send("No file uploaded.");
    return;
  }

  Unique_2=req.body.Unique2;
  Merge_2=req.body.Merge2;
  

  const filePath = req.file.path;
  // Check if the file has an Excel extension
  const fileExtension = path.extname(req.file.originalname).toLowerCase();
  if (fileExtension !== ".xlsx" && fileExtension !== ".xls") {
    // Delete the uploaded file
    fs.unlinkSync(filePath);
    // res.render("index", { error: "only excel files are supported!" });
    res.redirect("/");
    return;
  }

  // Rename the file

  const newFileName = "localbook" + fileExtension;
  const newFilePath = path.join(path.dirname(filePath), newFileName);

  // Delete the previous file if it exists
  if (fs.existsSync(newFilePath)) {
    fs.unlinkSync(newFilePath);
  }

  // Rename the uploaded file
  if (newFilePath) {
    fs.renameSync(filePath, newFilePath);
  }

  const workbook = XLSX.readFile(newFilePath);
  const sheetName = workbook.SheetNames[0];
  const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
  const rowCount = sheetData.length; // Get the total number of rows
  totalLocalRows += rowCount;
  isLocalFileReady = true;
  isexcel=true
  // console.log(sheetData);
  req.flash("successLocal", "Excel File uploaded successfully");
  res.redirect("/");
});





const removeDups = () => {
  // Read the csv files


  if(iscsv){

    const uniquePhonesA = new Set();
    const mergedDataA = [];

  for (const row of dataA) {
    const phone = row[Unique_1];

    if (!uniquePhonesA.has(phone)) {
      uniquePhonesA.add(phone);
      mergedDataA.push(row);
    } else {
      // Find the existing row with the same phone and merge names
      const existingRowIndex = mergedDataA.findIndex((r) => r[Unique_1] === phone);
      mergedDataA[existingRowIndex][Merge_1] += ", " + row[Merge_1];
    }
  }

  dataA.length=0;


  const csvContent = [
    Object.keys(mergedDataA[0]).join(","), // Header row
    ...mergedDataA.map((row) => Object.values(row).join(",")), // Join object values
  ].join("\n");



// Write CSV file
fs.writeFile("public/uploads/result.csv", csvContent, (err) => {
if (err) {
  console.error("Error writing CSV file:", err);
} else {
  console.log("CSV file written successfully!");
}
});


  }
  





 if(isexcel){
   

  const workbookB = XLSX.readFile("public/uploads/localbook.xlsx");

   // Get the first sheet of each workbook
  
   const sheetB = workbookB.Sheets[workbookB.SheetNames[0]];
 
   // Convert sheet data to JSON format
   
   const dataB = XLSX.utils.sheet_to_json(sheetB);

  const uniquePhonesB = new Set();
  const mergedDataB = [];

  for (const row of dataB) {
    console.log(Unique_2);
    const phone = row[Unique_2];

    if (!uniquePhonesB.has(phone)) {
      uniquePhonesB.add(phone);
      mergedDataB.push(row);
    } else {
      // Find the existing row with the same phone and merge names
      const existingRowIndex = mergedDataB.findIndex((r) => r[Unique_2] === phone);
      mergedDataB[existingRowIndex][Merge_2] += ", " + row[Merge_2];
    }
  }




  const csvContentB = [
    Object.keys(mergedDataB[0]).join(","), // Header row
      ...mergedDataB.map((row) => Object.values(row).join(",")), // Join object values
    ].join("\n");
  
  // Write CSV file
  fs.writeFile("public/uploads/result2.csv", csvContentB, (err) => {
  if (err) {
    console.error("Error writing CSV file:", err);
  } else {
    console.log("CSV2 file written successfully!");
  }
  });
  
  // console.log(finalDataB);
  // console.log("-----------");
  // console.log(uniqueCrA);
  // console.log(uniqueCrB);

  // Merge finalDataA with uniqueCrA
 

  // Merge finalDataB with uniqueCrB

  // Generate CSV content

  // Create a new workbook
  const resultWorkbook = XLSX.utils.book_new();

  // Convert uniqueDataA to worksheet and add it to the workbook
  const worksheetB = XLSX.utils.json_to_sheet(mergedDataB);
  XLSX.utils.book_append_sheet(resultWorkbook, worksheetB, "bank_sheet");

  // Write the result workbook to a new Excel file
  XLSX.writeFile(resultWorkbook, "public/uploads/result.xlsx");



  

 }



};



const cleanUp = () => {
  isBankFileReady = false;
  isLocalFileReady = false;
  isDownloadReady = false;
  isexcel=false;
  iscsv=false;

  // Optional: Remove the original files if desired
  //fs.unlinkSync(path.join("public", "uploads", "bankbook.xlsx"));
  //fs.unlinkSync(path.join("public", "uploads", "localbook.xlsx"));
  //fs.unlinkSync(path.join("public", "uploads", "result.csv"));
  //fs.unlinkSync(path.join("public", "uploads", "result.xlsx"));
  //fs.unlinkSync(path.join("public", "uploads", "result2.csv"));

};

router.get("/removeDups", (req, res) => {
  removeDups();
  req.flash("dupMessage", "Duplicates removed successfully!");
  isDownloadReady = true;
  
  isDonateReady = true;
  // Redirect to another route if needed
  res.redirect("/");
});

router.get("/download", (req, res) => {
  const file = "public/uploads/result.xlsx";
  res.download(file, "result.xlsx", (err) => {
    if (err) {
      req.flash("fileErrMessage", "Failed to download the file");
      
    } else {
      req.flash("fileSuccessMessage", "File downloaded successfully!");
      cleanUp(); // Perform any necessary clean-up actions after the download
      
    }

    

    // Redirect to the desired route using JavaScript
  });
  
  
});




router.get("/downloadcsv", (req, res) => {
  const file= "public/uploads/result.csv";
  res.download(file, "result.csv", (err) => {
    if (err) {
      req.flash("fileErrMessage", "Failed to download the file");
    } else {
      req.flash("fileSuccessMessage", "File downloaded successfully!");
     cleanUp(); // Perform any necessary clean-up actions after the download
    }

    

    // Redirect to the desired route using JavaScript
  });
  
});


  
router.get("/downloadXcsv", (req, res) => {
  const file= "public/uploads/result2.csv";
  res.download(file, "result2.csv", (err) => {
    if (err) {
      req.flash("fileErrMessage", "Failed to download the file");
      console.log("fail");
    } else {
      req.flash("fileSuccessMessage", "File downloaded successfully!");
      cleanUp(); // Perform any necessary clean-up actions after the download
      console.log("nfail");
    }

    

    // Redirect to the desired route using JavaScript
  });
  


  
});

module.exports = router;
