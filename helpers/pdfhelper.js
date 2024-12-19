const PDFDocument = require("pdfkit");
const { addPDFHeader } = require("./header");
const { createStatementOfAccount } = require("./statement");
const { createDynamicBorderRow } = require("./DynamicTable");
const { addWatermark } = require("./DrawForInformation");
const { drawFooter } = require("./DynamicTable"); // Import the footer drawing function

const generatePDF = (data, res) => {
  try {
    const doc = new PDFDocument({ size: [612, 792] }); // US Letter size
    doc.pipe(res);

    let currentPage = 1;
    let totalPages = 1;  // Initially, we don't know the total pages

    // Track page count after each page is added
    doc.on('pageAdded', () => {
      currentPage++;
      totalPages = currentPage;  // Update total pages with current page count
    });

    // First page watermark
    // addWatermark(doc);
    

    // Header function
    addPDFHeader(doc);
    
    // Statement of account creation
    createStatementOfAccount(doc);

    // Dynamic data row
    createDynamicBorderRow(doc, data);

    // Add footer after all content is added (on each page)
    // doc.on('pageAdded', () => {
    //   drawFooter(doc, currentPage, totalPages);  // Call the drawFooter function from footer.js
    // });

    doc.end();
  } catch (error) {
    throw new Error("Error generating PDF: " + error.message);
  }
};

module.exports = { generatePDF };
