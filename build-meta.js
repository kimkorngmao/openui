const fs = require('fs');
const path = require('path');

const baseDir = path.join(process.cwd(), "public", "components");
const metadata = {};

if (fs.existsSync(baseDir)) {
  const categories = fs.readdirSync(baseDir).filter((item) =>
    fs.statSync(path.join(baseDir, item)).isDirectory()
  );

  categories.forEach((folder) => {
    const folderPath = path.join(baseDir, folder);
    const files = fs
      .readdirSync(folderPath)
      .filter((file) => file.endsWith(".html"));

    metadata[folder] = files.map((file) => {
      const filePath = path.join(folderPath, file);
      const stats = fs.statSync(filePath);
      return {
        fileName: file,
        createdAt: stats.birthtime,
      };
    });
  });
}

fs.writeFileSync(
  path.join(process.cwd(), "public", "fileMeta.json"),
  JSON.stringify(metadata, null, 2),
  "utf-8"
);

console.log("File metadata extracted successfully.");
