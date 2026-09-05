import sharp from "sharp";
import fs from "fs";

async function generateWideHero() {
  const bgWidth = 1920;
  const bgHeight = 650;

  // Background SVG with perfectly matching royal purple gradient and subtle soft glow
  const svg = `<svg width="${bgWidth}" height="${bgHeight}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#180293" />
        <stop offset="30%" stop-color="#1e04a0" />
        <stop offset="70%" stop-color="#2808b8" />
        <stop offset="100%" stop-color="#2406a6" />
      </linearGradient>
      <radialGradient id="glowRight" cx="75%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#3d0bc9" stop-opacity="0.8" />
        <stop offset="60%" stop-color="#2808b8" stop-opacity="0.3" />
        <stop offset="100%" stop-color="#180293" stop-opacity="0" />
      </radialGradient>
      <radialGradient id="glowLeft" cx="25%" cy="50%" r="40%">
        <stop offset="0%" stop-color="#2d06b8" stop-opacity="0.5" />
        <stop offset="100%" stop-color="#180293" stop-opacity="0" />
      </radialGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#bgGrad)" />
    <rect width="100%" height="100%" fill="url(#glowRight)" />
    <rect width="100%" height="100%" fill="url(#glowLeft)" />
  </svg>`;

  const bgBuffer = await sharp(Buffer.from(svg)).png().toBuffer();

  // Resize original image cleanly to fit height 650
  const originalResized = await sharp("public/hero-1fi-banner.jpg")
    .resize({ height: 650, fit: "contain", background: { r: 24, g: 2, b: 147, alpha: 1 } })
    .toBuffer();

  const meta = await sharp(originalResized).metadata();
  const left = Math.round((bgWidth - meta.width) / 2);

  await sharp(bgBuffer)
    .composite([{ input: originalResized, top: 0, left }])
    .jpeg({ quality: 96 })
    .toFile("public/hero-1fi-banner-wide.jpg");

  console.log(`Wide hero banner generated at ${bgWidth}x${bgHeight} (aspect ratio 2.95:1)!`);
}

generateWideHero().catch(console.error);
