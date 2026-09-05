import sharp from "sharp";
import fs from "fs";

async function generateSeamlessHero() {
  const targetW = 1920;
  const targetH = 650;

  // 1. Resize original image to height 650
  const original = sharp("public/hero-1fi-banner.jpg");
  const origResizedBuffer = await original
    .resize({ height: targetH, width: Math.round((1024 * targetH) / 714), fit: "fill" })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { data: imgData, info: imgInfo } = origResizedBuffer;
  const imgW = imgInfo.width;
  const imgH = imgInfo.height;

  // 2. Apply smooth alpha feathering on left (first 90px) and right (last 90px) edges
  const featherDist = 90;
  for (let y = 0; y < imgH; y++) {
    for (let x = 0; x < imgW; x++) {
      const idx = (y * imgW + x) * 4;
      let alpha = 1.0;

      // Left edge feathering
      if (x < featherDist) {
        // Smooth hermite / cosine ease
        const t = x / featherDist;
        alpha = Math.min(alpha, t * t * (3 - 2 * t));
      }
      // Right edge feathering
      if (x > imgW - featherDist) {
        const t = (imgW - x) / featherDist;
        alpha = Math.min(alpha, t * t * (3 - 2 * t));
      }

      imgData[idx + 3] = Math.round(alpha * 255);
    }
  }

  const featheredImgBuffer = await sharp(imgData, {
    raw: { width: imgW, height: imgH, channels: 4 },
  })
    .png()
    .toBuffer();

  // 3. Create a seamless matching gradient background
  // Left: #18038c, Right: #2d07c4
  const svgBg = `<svg width="${targetW}" height="${targetH}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#18038c" />
        <stop offset="35%" stop-color="#1c0498" />
        <stop offset="65%" stop-color="#2606b5" />
        <stop offset="100%" stop-color="#2d07c4" />
      </linearGradient>
      <radialGradient id="glowBag" cx="72%" cy="48%" r="45%">
        <stop offset="0%" stop-color="#3d0bc9" stop-opacity="0.6" />
        <stop offset="70%" stop-color="#2606b5" stop-opacity="0.2" />
        <stop offset="100%" stop-color="#18038c" stop-opacity="0" />
      </radialGradient>
      <radialGradient id="glowText" cx="25%" cy="50%" r="40%">
        <stop offset="0%" stop-color="#2807b5" stop-opacity="0.5" />
        <stop offset="100%" stop-color="#18038c" stop-opacity="0" />
      </radialGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#bgGrad)" />
    <rect width="100%" height="100%" fill="url(#glowBag)" />
    <rect width="100%" height="100%" fill="url(#glowText)" />
  </svg>`;

  const bgBuffer = await sharp(Buffer.from(svgBg)).png().toBuffer();

  // Center feathered image onto background
  const leftOffset = Math.round((targetW - imgW) / 2);

  await sharp(bgBuffer)
    .composite([
      {
        input: featheredImgBuffer,
        top: 0,
        left: leftOffset,
      },
    ])
    .jpeg({ quality: 98, chromaSubsampling: "4:4:4" })
    .toFile("public/hero-1fi-banner-wide.jpg");

  console.log(`Seamless wide hero banner successfully generated at ${targetW}x${targetH}!`);
}

generateSeamlessHero().catch(console.error);
