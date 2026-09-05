import sharp from "sharp";
import path from "path";
import fs from "fs";

async function processMistBlueImage() {
  const userUploadsDir = "C:/Users/SK Studio/.gemini/antigravity/brain/c7cff1e9-ee67-48e9-bf8d-6915fb563557/.user_uploaded";
  const mistBlueUpload = path.join(userUploadsDir, "media_1788435533033.webp");
  const outputDir = "public/products";

  if (fs.existsSync(mistBlueUpload)) {
    // 1. Convert to high-res JPG for default iPhone 17
    await sharp(mistBlueUpload)
      .jpeg({ quality: 98 })
      .toFile(path.join(outputDir, "iphone-17.jpg"));

    await sharp(mistBlueUpload)
      .jpeg({ quality: 98 })
      .toFile(path.join(outputDir, "iphone-17-blue.jpg"));

    await sharp(mistBlueUpload)
      .jpeg({ quality: 98 })
      .toFile(path.join(outputDir, "iphone-17-mist-blue.jpg"));

    // Extract the back-only phone (left half)
    const meta = await sharp(mistBlueUpload).metadata();
    const w = meta.width;
    const h = meta.height;

    await sharp(mistBlueUpload)
      .extract({ left: 0, top: 0, width: Math.floor(w * 0.58), height: h })
      .jpeg({ quality: 98 })
      .toFile(path.join(outputDir, "iphone-17-back.jpg"));

    console.log("Successfully converted and saved authentic iPhone 17 Mist Blue images!");
  }
}

processMistBlueImage().catch(console.error);
