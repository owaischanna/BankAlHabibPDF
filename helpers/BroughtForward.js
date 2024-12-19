function formatNumberWithCommas(value) {
    if (isNaN(value)) return ""; // Return an empty string if the value is not a number
    return value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  let currentPage = 1; // Start with page 1
  let lastBalance = null; // To store the balance for Carried Forward/Brought Forward rows


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

  module.exports={drawBroughtForward};