import sharp from "sharp";
import path from "path";
import fs from "fs";

async function processAllUploads() {
  const userUploadsDir = "C:/Users/SK Studio/.gemini/antigravity/brain/c7cff1e9-ee67-48e9-bf8d-6915fb563557/.user_uploaded";
  const outputDir = "public/products";

  const mappings = [
    {
      src: "media_1788435814018.webp", // iPhone 17 Mist Blue
      targets: ["iphone-17.jpg", "iphone-17-mist-blue.jpg", "iphone-17-blue.jpg"],
    },
    {
      src: "media_1788435839873.webp", // iPhone 16 Ultramarine
      targets: ["iphone-16.jpg", "iphone-16-ultramarine.jpg"],
    },
    {
      src: "media_1788435859522.webp", // iPhone 16 Pro Black Titanium
      targets: ["iphone-16-pro.jpg", "iphone-16-pro-black.jpg"],
    },
    {
      src: "media_1788435961415.webp", // iPhone 17 Pro Silver Visor
      targets: ["iphone-17-pro.jpg", "iphone-17-pro-silver.jpg", "iphone-17-pro-front.jpg"],
    },
    {
      src: "media_1788435949557.webp", // iPhone 17 Pro Max Desert Titanium Visor
      targets: ["iphone-17-pro-max.jpg", "iphone-17-pro-max-desert.jpg", "iphone-17-pro-copper.jpg"],
    },
    {
      src: "media_1788435937639.webp", // iPhone 17 Pro Max Space Black Visor
      targets: ["iphone-17-pro-max-black.jpg", "iphone-17-pro-black.jpg"],
    },
  ];

  for (const m of mappings) {
    const srcPath = path.join(userUploadsDir, m.src);
    if (fs.existsSync(srcPath)) {
      for (const target of m.targets) {
        await sharp(srcPath)
          .jpeg({ quality: 98 })
          .toFile(path.join(outputDir, target));
        console.log(`Saved ${target} from ${m.src}`);
      }
    } else {
      console.warn(`Source file not found: ${m.src}`);
    }
  }

  console.log("All authentic iPhone uploads successfully processed!");
}

processAllUploads().catch(console.error);
