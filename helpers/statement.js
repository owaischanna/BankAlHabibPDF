const fs = require("fs"); // Required for loading the image

const createStatementOfAccount = (doc) => {
  const leftMargin = 50;
  const rightMargin = 50;
  const topMargin = 70; // Adjusted for compact layout
  doc.registerFont('Arial', './Fonts/Arial.ttf');
  

  // Add the "Statement of Account" header centered
  const headerText = "ONLINE STATEMENT OF ACCOUNT";
  const headerWidth = doc.widthOfString(headerText);
  const headerX = (doc.page.width - headerWidth) / 2 - 20;

  doc
    .fontSize(8) // Slightly larger font size for the header
    .font("Helvetica-Bold")
    .text(headerText, headerX, topMargin);

  // Add the date range centered below the header
  const dateRangeText = "From 01/08/2024 To 14/12/2024";
  const dateRangeWidth = doc.widthOfString(dateRangeText);
  const dateRangeX = (doc.page.width - dateRangeWidth) / 2 - 20;

  doc
    .fontSize(7.5)
    .font("Arial")
    .text(dateRangeText, dateRangeX, topMargin + 13); // Adjusted spacing

  // Add space between sections
  doc.moveDown();

  // Add Name and Address Info in left block
  doc
    .fontSize(6.5)
    .text("NAME:              MUHAMMAD ALEEM", leftMargin, topMargin + 30)
    .text("ADDRESS:          HOUSE 51, BLOCK E, SECTOR 1,DHA (XI) ", leftMargin, topMargin + 38)
    .text("RAHBER, LAHORE - PAKISTAN", leftMargin + 50, topMargin + 48); // Align continued address

  // Add Account Info in right block (Move them down a bit)
  const accountInfo = [
    { label: "ACCOUNT NO:", value: "0029-0091-000909-01-5" },
    { label: "ACCOUNT TYPE:", value: "ALHABIB APNA CURR AC" },
    { label: "CURRENCY:", value: "PAKISTANI RUPEES" },
    { label: "IBAN NO :", value: "PK14 BAHL 0029 0091 0009 0901" }
  ];

  let currentY = topMargin + 25; // Start alignment at a bit lower position to move account info down
  accountInfo.forEach((item) => {
    doc
      .fontSize(7)
      .font("Arial")
      .text(`${item.label}`, doc.page.width - rightMargin - 290, currentY) // Left-aligned
      .text(`${item.value}`, doc.page.width - rightMargin - 230, currentY, { align: "left" }); // Right-aligned to the label
    currentY += 8; // Increased vertical spacing to move info further down
  });

  // Add Scanner Text Above Image (Move Scanner up)
  const scannerX = doc.page.width - rightMargin - 85; // Move the scanner further to the right
  let scannerY = topMargin - 20; // Move scanner up by reducing the Y value

  doc
    .fontSize(7)
    .font("Arial")
    .text("Scan to Verify your", scannerX, scannerY - 10, { align: "center" }) // Text positioned above image
    .text("Account Details", scannerX, scannerY, { align: "center" }); // Second line of text

  // Add Scanner Image and Border with reduced size
  const scannerImagePath = "./images/scan12.jpg"; // Path to the scanner image file

  if (fs.existsSync(scannerImagePath)) {
    doc
      .rect(scannerX, scannerY + 10, 80, 60) // Reduced border size and positioned below the text
      .stroke(); // Add border
    doc.image(scannerImagePath, scannerX + 5, scannerY + 15, { width: 65, height: 50 }); // Reduced image size
  }
  
  doc
    .fontSize(7)
    .font("Arial")
    .text("MUHAMMAD ALEEM-0901", scannerX, scannerY + 70, { align: "center" }); // Text positioned below the image and border
};

module.exports = { createStatementOfAccount };
