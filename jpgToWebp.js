//
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
// const dir = require("../../../Downloads");

const inputDir = "./jpg_input";
const outputDir = "./jpg_output";
let convertSuccess = false;

console.log("Start proccess!");

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.readdir(inputDir, async (err, files) => {
  if (err) return console.log(err);

  console.log("Reading files...");
  const webpFiles = files.filter((file) => file.endsWith(".jpg") || file.endsWith(".jpeg"));

  if (webpFiles.length === 0) return console.log("No WebP files found in the input dir");

  for (const file of webpFiles) {
    const inputPath = path.join(inputDir, file);
    const outputFilename = `${path.parse(file).name}.webp`;
    const outputPath = path.join(outputDir, outputFilename);

    try {
      await sharp(inputPath).jpeg().toFile(outputPath);
      console.log(`Converted ${file} to ${outputFilename}`);
      convertSuccess = true;
      //
    } catch (err) {
      console.error(`Error converting ${file}:`, err);
    }
  }
  if (convertSuccess) {
    console.log("End proccess!");
    convertSuccess = false;
  }
});
