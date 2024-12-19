// footer.js
const drawFooter = (doc, currentPage, totalPages) => {
    const footerText = `Page ${currentPage} of ${totalPages}`; // Dynamically calculate total pages
    const footerYPosition = doc.page.height - 30;  // Adjusted for footer position
    const footerPadding = 5;
    const textYPosition = footerYPosition + footerPadding;
    const textBoxWidth = doc.page.width - 2 * footerPadding;
  
    doc
      .fillColor("#000000")
      .font("Arial")
      .fontSize(8)
      .text(footerText, footerPadding, textYPosition, {
        width: textBoxWidth,
        align: "right",
        valign: "middle",
      });
  };
  
  module.exports = { drawFooter };
  