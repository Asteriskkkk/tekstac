const path = require("path");

function getFileDetails(filePath) {
  const directory = path.dirname(filePath);
  const filename = path.basename(filePath);
  const extension = path.extname(filePath);

  return `Directories - ${directory}
Filename - ${filename}
Extension - ${extension}`;
}

const filePath = "/Users/Refsnes/demo.js";
console.log(getFileDetails(filePath));
