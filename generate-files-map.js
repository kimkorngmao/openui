import fs from "fs";
import path from "path";

const baseDir = path.join(process.cwd(), "public", "components");
const filesMapPath = path.join(process.cwd(), "filesmap.json");

const pinnedFiles = ['music-player.html', 'credit-card.html']

let filesMap = [];

if (fs.existsSync(baseDir)) {
  const categories = fs.readdirSync(baseDir).filter((item) =>
    fs.statSync(path.join(baseDir, item)).isDirectory()
  );

  categories.forEach((category) => {
    const categoryDir = path.join(baseDir, category);
    const files = fs.readdirSync(categoryDir).filter((file) => file.endsWith(".html"));

    files.forEach((file) => {
      const filePath = path.join(categoryDir, file);
      const stats = fs.statSync(filePath);
      
      filesMap.push({
        path: `public/components/${category}/${file}`,
        fileName: file,
        category: category,
        createdAt: stats.birthtime.toISOString(), 
        isPinned: pinnedFiles.includes(file)
      });
    });
  });
}

fs.writeFileSync(filesMapPath, JSON.stringify(filesMap, null, 2), "utf-8");

console.log("filesmap.json has been generated successfully!");
