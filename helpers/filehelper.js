const xlsx = require("xlsx");

const readExcelFile = (filePath, sheetIndex = 0) => {
  try {
    const workbook = xlsx.readFile(filePath);
    
    // Get the sheet name dynamically based on the provided index
    const sheetName = workbook.SheetNames[sheetIndex];
    if (!sheetName) {
      throw new Error("Sheet index is out of bounds");
    }

    const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
    
    // Optionally handle empty data
    if (sheetData.length === 0) {
      throw new Error("Sheet contains no data");
    }

    return sheetData;
  } catch (error) {
    throw new Error("Error reading Excel file: " + error.message);
  }
};

module.exports = { readExcelFile };
