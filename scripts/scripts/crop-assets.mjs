import sharp from "sharp";
import path from "path";
import fs from "fs";

async function processImages() {
  const userUploadsDir = "C:/Users/SK Studio/.gemini/antigravity/brain/c7cff1e9-ee67-48e9-bf8d-6915fb563557/.user_uploaded";
  const outputDir = "public/products";

  const img17ePath = path.join(userUploadsDir, "media_1788428144670.jpg");
  const img17ScreenshotPath = path.join(userUploadsDir, "media_1788428260596.png");

  if (fs.existsSync(img17ePath)) {
    const meta17e = await sharp(img17ePath).metadata();
    const w = meta17e.width;
    const h = meta17e.height;

    // Full 3-phone lineup
    await sharp(img17ePath)
      .toFile(path.join(outputDir, "iphone-17e.jpg"));

    // Pink phone
    await sharp(img17ePath)
      .extract({ left: Math.floor(w * 0.46), top: 0, width: Math.floor(w * 0.54), height: h })
      .toFile(path.join(outputDir, "iphone-17e-pink.jpg"));

    // Black phone
    await sharp(img17ePath)
      .extract({ left: 0, top: 0, width: Math.floor(w * 0.35), height: h })
      .toFile(path.join(outputDir, "iphone-17e-black.jpg"));

    // White phone
    await sharp(img17ePath)
      .extract({ left: Math.floor(w * 0.28), top: 0, width: Math.floor(w * 0.35), height: h })
      .toFile(path.join(outputDir, "iphone-17e-white.jpg"));
  }

  if (fs.existsSync(img17ScreenshotPath)) {
    const meta17 = await sharp(img17ScreenshotPath).metadata();
    const w = meta17.width;
    const h = meta17.height;

    // Crop just the phone and retail box cleanly without the outer black browser chrome
    const cropX = Math.floor(w * 0.045);
    const cropY = Math.floor(h * 0.285);
    const cropW = Math.floor(w * 0.41);
    const cropH = Math.floor(h * 0.35);

    await sharp(img17ScreenshotPath)
      .extract({ left: cropX, top: cropY, width: cropW, height: cropH })
      .toFile(path.join(outputDir, "iphone-17.jpg"));

    await sharp(img17ScreenshotPath)
      .extract({ left: cropX, top: cropY, width: cropW, height: cropH })
      .toFile(path.join(outputDir, "iphone-17-white.jpg"));

    // Crop the bottom blue phone from related content
    const blueX = Math.floor(w * 0.115);
    const blueY = Math.floor(h * 0.84);
    const blueW = Math.floor(w * 0.05);
    const blueH = Math.floor(h * 0.10);

    if (blueX + blueW <= w && blueY + blueH <= h) {
      await sharp(img17ScreenshotPath)
        .extract({ left: blueX, top: blueY, width: blueW, height: blueH })
        .toFile(path.join(outputDir, "iphone-17-blue.jpg"));
    }
  }

  console.log("Refined crops saved successfully!");
}

processImages().catch(console.error);
