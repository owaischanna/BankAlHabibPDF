let lastBalance = null; // To store the balance for Carried Forward/Brought Forward rows

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
  

  module.exports={drawCarriedForward};