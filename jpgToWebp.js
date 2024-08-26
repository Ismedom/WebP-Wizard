//
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
// const dir = require("../../../Downloads");

const inputDir = "./jpg_input";
const outputDir = "./webp_output";
let convertSuccess = false;

console.log("\x1b[32m%s\x1b[0m", "Start proccess!");

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.readdir(inputDir, async (err, files) => {
  if (err) return console.error(err);

  console.log("\x1b[32m%s\x1b[0m", "Reading files...");
  const webpFiles = files.filter((file) => file.endsWith(".jpg") || file.endsWith(".jpeg"));

  if (webpFiles.length === 0) return console.warn("No WebP files found in the input dir");

  for (const file of webpFiles) {
    const inputPath = path.join(inputDir, file);
    const outputFilename = `${path.parse(file).name}.webp`;
    const outputPath = path.join(outputDir, outputFilename);

    try {
      await sharp(inputPath).jpeg().toFile(outputPath);
      console.log("\x1b[32m%s\x1b[0m", `Converted ${file} to ${outputFilename}`);
      convertSuccess = true;
      //
    } catch (err) {
      console.error(`Error converting ${file}:`, err);
    }
  }
  if (convertSuccess) {
    console.log("\x1b[32m%s\x1b[0m", `Ouput in ${outputDir} directory!`);
    console.log("\x1b[32m%s\x1b[0m", "End proccess!");
    convertSuccess = false;
  }
});
