const fs = require("fs");
const path = require("path");

const baseDir = path.join(process.cwd(), "public", "components");
const outputFilePath = path.join(baseDir, "fileMaps.json");

let fileMap = {};

// Load existing fileMaps.json if it exists
if (fs.existsSync(outputFilePath)) {
  try {
    const rawData = fs.readFileSync(outputFilePath, "utf-8");
    fileMap = JSON.parse(rawData);
  } catch (error) {
    console.error("⚠️ Error reading existing fileMaps.json: ", error);
  }
}

const getFilesRecursively = (dir, category = "") => {
  if (!fs.existsSync(dir)) return;

  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const relativePath = path.join(file);

    if (fs.statSync(filePath).isDirectory()) {
      getFilesRecursively(filePath, relativePath);
    } else if (file.endsWith(".html")) {
      if (!fileMap[relativePath]) {
        const stats = fs.statSync(filePath);
        fileMap[relativePath] = {
          createdAt: stats.birthtime.toISOString(),
          isPinned: false,
        };
      }
    }
  });
};

// Start scanning
if (fs.existsSync(baseDir)) {
  const categories = fs.readdirSync(baseDir).filter((item) =>
    fs.statSync(path.join(baseDir, item)).isDirectory()
  );

  categories.forEach((category) => {
    getFilesRecursively(path.join(baseDir, category), category);
  });
}

// Write updated JSON file
fs.writeFileSync(outputFilePath, JSON.stringify(fileMap, null, 2));

console.log(`✅ fileMaps.json updated at: ${outputFilePath}`);
