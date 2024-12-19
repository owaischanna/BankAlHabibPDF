const { addPDFHeader } = require("./header");
const { createStatementOfAccount } = require("./statement");
const { drawForInformationOnly } = require("./DrawForInformation");
const { addFooterText } = require("./addFooter");



  // let lastBalance = null; // To store the balance for Carried Forward/Brought Forward rows
  // let currentY = topMargin;

const createDynamicBorderRow = (
  doc,
  data,
  leftMargin = 35,
  topMargin = 140,
  columnWidths = [50, 40, 105, 165, 60, 60, 60],
  headers = [
    "DATE",
    "VALUE DATE",
    "INSTRUMENT/ DOC NO.",
    "DETAILS",
    "DEBIT",
    "CREDIT",
    "BALANCE",
  ],
  rowHeight = 10,
  rowSpacing = -1,
  footerHeight = 20,
  cornerRadius = 5,
  headerBackgroundColor = "#f5f5f5"
  
) => {

  // Initialize variables to calculate totals
  let totalDebit = 0; // Initialize total debit
  let totalCredit = 0; // Initialize total credit
  const cellHeight = 20; // Header cell height
  const totalRowWidth = columnWidths.reduce((sum, width) => sum + width, 0);
  let currentY = topMargin;
  let currentPage = 1; // Start with page 1
  let lastBalance = null; // To store the balance for Carried Forward/Brought Forward rows

  const formatDate = (date) => {
    if (!date) return "";
    
    if (typeof date === "number" && date > 0) {
      const jsDate = new Date((date - 25569) * 86400 * 1000);
      
      // Get day, month, and year
      const day = jsDate.getDate().toString().padStart(2, "0");
      const month = (jsDate.getMonth() + 1).toString().padStart(2, "0"); // Month is 0-based, so we add 1
      const year = jsDate.getFullYear().toString().slice(-2); // Get last two digits of the year
      
      return `${day}/${month}/${year}`;
    }
  
    return date;
  };
  
  doc.registerFont('Arial', './Fonts/Arial.ttf');
  

  const formatNumber = (num) => {
    if (typeof num === "number") {
      return num.toFixed(2);
    }
    return num;
  };

  const drawRoundedRect = (x, y, width, height, radius) => {
    doc
      .moveTo(x + radius, y)
      .lineTo(x + width - radius, y)
      .quadraticCurveTo(x + width, y, x + width, y + radius)
      .lineTo(x + width, y + height - radius)
      .quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
      .lineTo(x + radius, y + height)
      .quadraticCurveTo(x, y + height, x, y + height - radius)
      .lineTo(x, y + radius)
      .quadraticCurveTo(x, y, x + radius, y)
      .closePath();
  };

  const drawHeader = () => {
    // Set headerX to 0 to remove the left margin
    const headerX = leftMargin;  // Starting from the left margin
    const headerWidth = totalRowWidth;  // Full width without extra margin
  
    // Draw the top and bottom borders only, excluding the left and right borders
    doc
      .moveTo(headerX, currentY)  // Start at the left side of the header
      .lineTo(headerX + headerWidth, currentY)  // Draw top border to the right side
      .stroke();  // Top border
  
    doc
      .moveTo(headerX, currentY + cellHeight)  // Start at the left side of the header
      .lineTo(headerX + headerWidth, currentY + cellHeight)  // Draw bottom border to the right side
      .stroke();  // Bottom border
  
    let currentX = leftMargin;  // Starting X position for header text
    headers.forEach((header, index) => {
      doc
        .fillColor("#000000")
        .font("Helvetica-Bold")  // Bold font for header text
        .fontSize(7)  // Match the header font size
        .text(header, currentX + 5, currentY + 5, {
          width: columnWidths[index] - 10,
          align: "left",
        });
  
      currentX += columnWidths[index];  // Move to the next column's X position
    });
  
    currentY += cellHeight + rowSpacing;  // Move Y position down for next row
  };
  

  let totalPages=9;
  // footer.js
  const drawFooter = () => {
    const footerText = `Page ${currentPage} of ${totalPages}`; // Dynamically calculate total pages
    const footerYPosition = doc.page.height - 30;  // Adjusted for footer position
    const footerPadding = 10;
    const textYPosition = footerYPosition + footerPadding;
    const textBoxWidth = doc.page.width - 2 * footerPadding;

    doc
      .fillColor("#000000")
      .font("Arial")
      .fontSize(8)
      .text(footerText, footerPadding, textYPosition, {
        width: textBoxWidth,
        align: "right",
        height: 10,  // Adjusted height
        valign: "middle",
      });
  };





  function formatNumberWithCommas(value) {
    if (isNaN(value)) return ""; // Return an empty string if the value is not a number
    return value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  
  const drawCarriedForward = () => {
    const carriedForwardRow = {
      DETAILS: "---------- Carried Forward ----------->",
      BALANCE: formatNumberWithCommas(lastBalance), // Format the balance with commas
    };
  
    let dataX = leftMargin;
    headers.forEach((header, colIndex) => {
      const value = header === "DETAILS" ? carriedForwardRow[header] : (header === "BALANCE" ? carriedForwardRow["BALANCE"] : "");
  
      doc
        .fillColor("#000000")
        .font("Arial")
        .fontSize(7) // Smaller font for "Carried Forward"
        .text(value || "", dataX + 5, currentY + 6, {
          width: columnWidths[colIndex] - 10,
          align: "left",
        });
  
      dataX += columnWidths[colIndex];
    });
  
    currentY += rowHeight + rowSpacing;
  };
  
  const drawBroughtForward = () => {
    const broughtForwardRow = {
      DETAILS: "--------- Brought Forward ------------>",
      BALANCE: formatNumberWithCommas(lastBalance), // Format the balance with commas
    };
  
    let dataX = leftMargin;
    headers.forEach((header, colIndex) => {
      const value = header === "DETAILS" ? broughtForwardRow[header] : (header === "BALANCE" ? broughtForwardRow["BALANCE"] : "");
  
      doc
        .fillColor("#000000")
        .font("Arial")
        .fontSize(7) // Smaller font for "Brought Forward"
        .text(value || "", dataX + 5, currentY + 5, {
          width: columnWidths[colIndex] - 10,
          align: "left",
        });
  
      dataX += columnWidths[colIndex];
    });
  
    currentY += rowHeight + rowSpacing;
  };


  const drawClosingBalance = () => {
    const carriedForwardRow = {
      DETAILS: "---------- Closing Balance ----------->",
      BALANCE: formatNumberWithCommas(lastBalance), // Format the balance with commas
    };
  
    let dataX = leftMargin;
    headers.forEach((header, colIndex) => {
      const value = header === "DETAILS" ? carriedForwardRow[header] : (header === "BALANCE" ? carriedForwardRow["BALANCE"] : "");
  
      doc
        .fillColor("#000000")
        .font("Arial")
        .fontSize(7) // Smaller font for "Carried Forward"
        .text(value || "", dataX + 10, currentY + 10, {
          width: columnWidths[colIndex] - 10,
          align: "left",
        });
  
      dataX += columnWidths[colIndex];
    });
  
    currentY += rowHeight + rowSpacing;
  };
  const handlePageBreak = () => {
    // Ensure carried forward and footer are added before page break
    drawCarriedForward(); // Add "Carried Forward" row
    drawFooter(doc, currentPage, totalPages);         // Add footer at the end of the page
    doc.addPage();        // Add a new page
    currentPage++;
    currentY = topMargin; // Reset currentY to the top margin
  
    // Redraw header and brought forward row for the new page
    doc.font('Arial');
    addPDFHeader(doc);
    createStatementOfAccount(doc);
    drawHeader();
    drawBroughtForward(); // Add "Brought Forward" row
  };
  doc.font('Arial');
  addPDFHeader(doc);
  drawHeader();
  
  data.forEach((row) => {
    const requiredRowHeight = Math.max(
      ...headers.map((header, colIndex) => {
        const textHeight = doc.heightOfString(row[header] || "", {
          width: columnWidths[colIndex] - 10,
        });
        return textHeight + 10;
      })
    );

totalDebit += parseFloat(row["DEBIT"] || 0); // Accumulate Debit total
totalCredit += parseFloat(row["CREDIT"] || 0); // Accumulate Debit total

    const actualRowHeight = Math.max(rowHeight, requiredRowHeight);
  
    // Check if we need a page break considering footer and carried forward
    if (
      currentY + actualRowHeight + rowSpacing + footerHeight > 
      doc.page.height - 70
    ) {
      handlePageBreak();  // Handle page break
    }
  
    let dataX = leftMargin;
    headers.forEach((header, colIndex) => {
      let cellValue = row[header] !== undefined && row[header] !== null ? row[header] : "";
    
      // Completely skip empty DETAILS cells
      if (header === "DETAILS" && cellValue.trim() === "") {
        dataX += columnWidths[colIndex]; // Move to the next column
        return; // Skip this cell
      }
    
      // Format values for DATE, VALUE DATE, DEBIT, CREDIT, BALANCE
      if (header === "DATE" || header === "VALUE DATE") {
        cellValue = formatDate(cellValue);
      }
      if (header === "DEBIT" || header === "CREDIT" || header === "BALANCE") {
        cellValue = formatNumberWithCommas(parseFloat(cellValue)); // Add commas and format to 2 decimal places
      }
    
      // Draw text
      doc
        .fillColor("#000000")
        .font("Arial")
        .fontSize(7)
        .text(cellValue, dataX + 15, currentY + 15, {
          width: columnWidths[colIndex] - 10,
          align: "left",
        });
    
      // Optional: Draw borders only for non-empty cells
      if (!(header === "DETAILS" && cellValue.trim() === "")) {
        drawRoundedRect(dataX, currentY, columnWidths[colIndex], rowHeight, 5);
      }
    
      dataX += columnWidths[colIndex]; // Move to the next column
    });
    

    lastBalance = row["BALANCE"]; // Update last balance for next iteration
    currentY += actualRowHeight + rowSpacing; // Move Y position for next row
  });

  
  drawClosingBalance();


  const drawFinalTotalsHeader = (doc, currentY, leftMargin, columnWidths, totalDebit, totalCredit, headers,) => {
    const totalsHeader = {
      DETAILS: "TOTALS",
      DEBIT: formatNumberWithCommas(totalDebit),
      CREDIT: formatNumberWithCommas(totalCredit),
    };
  
    const rowHeight = 20;
    let dataX = leftMargin;
  
    // Draw text for totals
    headers.forEach((header, colIndex) => {
      let value = "";
  
      if (header === "DETAILS") value = totalsHeader["DETAILS"];
      if (header === "DEBIT") value = totalsHeader["DEBIT"];
      if (header === "CREDIT") value = totalsHeader["CREDIT"];
  
      doc
        .fillColor("#000000")
        .font("Arial")
        .fontSize(7)
        .text(value || "", dataX + 20, currentY + 20, {
          width: columnWidths[colIndex] - 10,
          align: "center",
        });
  
      dataX += columnWidths[colIndex];
    });
  
    return currentY + rowHeight; // Return updated Y position without drawing borders
  };
  
  // Example usage
  currentY = drawFinalTotalsHeader(
    doc,
    currentY,
    leftMargin,
    columnWidths,
    totalDebit,
    totalCredit,
    headers,
  
  );
  const drawBlankHeaderWithBorder = (doc, currentY, leftMargin, columnWidths) => {
    const rowHeight = 20; // Header row ki height
    const pageWidth = doc.page.width; // Total page width
  
    // Column widths ka sum calculate karen
    const headerWidth = columnWidths.reduce((sum, width) => sum + width, 0);
  
    // Ensure the header width is clipped to fit within the page width
    const clippedHeaderWidth = Math.min(headerWidth, pageWidth - leftMargin);
  
    console.log(`currentY: ${currentY}, leftMargin: ${leftMargin}, headerWidth: ${headerWidth}, clippedHeaderWidth: ${clippedHeaderWidth}, pageWidth: ${pageWidth}`);
  
    // doc.save(); // Save state
    doc.lineWidth(0.5);
  
    // Top Border for the header
    doc.moveTo(leftMargin, currentY)
       .lineTo(leftMargin + clippedHeaderWidth, currentY) // Border only within clipped area
       .stroke();
  
    // Bottom Border for the header
    doc.moveTo(leftMargin, currentY + rowHeight)
       .lineTo(leftMargin + clippedHeaderWidth, currentY + rowHeight) // Same as top border
       .stroke();
  
    // doc.restore(); // Restore state
  
    return currentY + rowHeight; // Return updated Y position
  };
  
  
  // // Example usage (assuming columnWidths and leftMargin are already declared):
  // currentY = drawBlankHeaderWithBorder(doc, currentY, leftMargin, columnWidths);
  
  
  drawFooter();

};
module.exports = { createDynamicBorderRow };


