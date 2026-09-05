import sharp from "sharp";
import path from "path";
import fs from "fs";

async function processCleanStudioPhone() {
  const userUploadsDir = "C:/Users/SK Studio/.gemini/antigravity/brain/c7cff1e9-ee67-48e9-bf8d-6915fb563557/.user_uploaded";
  const img17ScreenshotPath = path.join(userUploadsDir, "media_1788428260596.png");
  const outputDir = "public/products";

  const meta = await sharp(img17ScreenshotPath).metadata();
  const w = meta.width;
  const h = meta.height;

  // Let's crop just the standing iPhone 17 white phone on the right of the box
  // Looking at the screenshot, the right phone is around x: 0.24 to 0.35, y: 0.32 to 0.65
  const phoneX = Math.floor(w * 0.245);
  const phoneY = Math.floor(h * 0.33);
  const phoneW = Math.floor(w * 0.11);
  const phoneH = Math.floor(h * 0.30);

  // Extract the raw phone
  const rawPhone = await sharp(img17ScreenshotPath)
    .extract({ left: phoneX, top: phoneY, width: phoneW, height: phoneH })
    .toBuffer();

  // Create a 800x800 pure white canvas
  // Resize phone to fit nicely with padding
  const resizedPhone = await sharp(rawPhone)
    .resize(480, 640, { fit: "inside" })
    .toBuffer();

  const resizedMeta = await sharp(resizedPhone).metadata();

  // Composite the phone centered on clean white background with rounded corner framing
  const canvas = await sharp({
    create: {
      width: 800,
      height: 800,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    },
  })
    .composite([
      {
        input: resizedPhone,
        top: Math.floor((800 - (resizedMeta.height || 600)) / 2),
        left: Math.floor((800 - (resizedMeta.width || 400)) / 2),
      },
    ])
    .jpeg({ quality: 95 })
    .toFile(path.join(outputDir, "iphone-17.jpg"));

  // Also create a composite showing both Box and Phone on pure white
  const bothX = Math.floor(w * 0.15);
  const bothY = Math.floor(h * 0.30);
  const bothW = Math.floor(w * 0.22);
  const bothH = Math.floor(h * 0.34);

  const rawBoth = await sharp(img17ScreenshotPath)
    .extract({ left: bothX, top: bothY, width: bothW, height: bothH })
    .resize(600, 600, { fit: "inside" })
    .toBuffer();

  const bothMeta = await sharp(rawBoth).metadata();

  await sharp({
    create: {
      width: 800,
      height: 800,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    },
  })
    .composite([
      {
        input: rawBoth,
        top: Math.floor((800 - (bothMeta.height || 600)) / 2),
        left: Math.floor((800 - (bothMeta.width || 400)) / 2),
      },
    ])
    .jpeg({ quality: 95 })
    .toFile(path.join(outputDir, "iphone-17-white.jpg"));

  console.log("Processed clean studio iPhone 17 images!");
}

processCleanStudioPhone().catch(console.error);
