function addWatermark(doc, text = "FOR INFORMATION ONLY") {
  const { width, height } = doc.page;

  doc.save(); // Save the current graphic state

  // Right-side watermark (slightly down)
  doc
    .font("Helvetica-Bold") // Use bold font
    .fontSize(30) // Slightly larger font size
    .fillColor("gray") // Gray color for subtlety
    .opacity(0.3) // Adjust opacity for a lighter look
    .rotate(-30, { origin: [width / 2, height / 2] }) // Rotate for diagonal placement
    .text(
      text,
      -130, // Slightly leftward adjustment
      height / 1.65, // Move down on the right
      {
        align: "center",
        width: width + 100, // Extend text width to cover more area
      }
    );


  doc.restore(); // Restore the graphic state to avoid affecting other content
}

module.exports = { addWatermark };
