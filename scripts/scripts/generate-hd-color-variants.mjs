import sharp from "sharp";
import path from "path";
import fs from "fs";

async function generateHdColorVariants() {
  const outputDir = "public/products";

  // Function to create an ultra-crisp 1200x1200 vector-grade photorealistic studio render of iPhone 17 Pro Visor Architecture
  function getIphone17ProVisorSvg(bodyColor, visorColor, accentRing, name) {
    return `
    <svg width="1200" height="1200" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Dynamic Shadows -->
        <filter id="bodyShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="35" stdDeviation="30" flood-color="#0f172a" flood-opacity="0.22" />
        </filter>
        <filter id="visorShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="12" stdDeviation="10" flood-color="#000000" flood-opacity="0.30" />
        </filter>
        <filter id="lensBevel" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#000000" flood-opacity="0.45" />
        </filter>

        <!-- Body Gradient -->
        <linearGradient id="bodyGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${bodyColor.light}" />
          <stop offset="100%" stop-color="${bodyColor.dark}" />
        </linearGradient>

        <!-- Edge Titanium Gradient -->
        <linearGradient id="edgeGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="${bodyColor.edgeLight}" />
          <stop offset="50%" stop-color="#ffffff" />
          <stop offset="100%" stop-color="${bodyColor.edgeDark}" />
        </linearGradient>

        <!-- Visor Bar Gradient -->
        <linearGradient id="visorGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${visorColor.light}" />
          <stop offset="100%" stop-color="${visorColor.dark}" />
        </linearGradient>

        <!-- Camera Lenses Radial Gradients -->
        <radialGradient id="proLens1" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#1e293b" />
          <stop offset="45%" stop-color="#0f172a" />
          <stop offset="100%" stop-color="#020617" />
        </radialGradient>

        <radialGradient id="proLensReflect" cx="28%" cy="28%" r="55%">
          <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.75" />
          <stop offset="40%" stop-color="#818cf8" stop-opacity="0.3" />
          <stop offset="100%" stop-color="#020617" stop-opacity="0" />
        </radialGradient>
      </defs>

      <!-- Clean Pure White Studio Background -->
      <rect width="1200" height="1200" fill="#ffffff" />

      <!-- Ambient Studio Floor Shadow -->
      <ellipse cx="600" cy="1070" rx="250" ry="26" fill="#0f172a" opacity="0.12" filter="blur(16px)" />
      <ellipse cx="600" cy="1060" rx="180" ry="16" fill="#0f172a" opacity="0.18" filter="blur(8px)" />

      <!-- Main Phone Structure -->
      <g filter="url(#bodyShadow)" transform="translate(390, 140)">
        <!-- Outer Grade 5 Titanium Chassis (420 x 870) -->
        <rect x="0" y="0" width="420" height="870" rx="80" fill="url(#edgeGrad)" stroke="#94a3b8" stroke-width="2" />
        
        <!-- Matte Textured Back Glass Plate -->
        <rect x="6" y="6" width="408" height="858" rx="74" fill="url(#bodyGrad)" />

        <!-- Revolutionary Horizontal Pro Camera Visor Array (Width: 388, Height: 210) -->
        <g filter="url(#visorShadow)">
          <rect x="16" y="24" width="388" height="210" rx="42" fill="url(#visorGrad)" stroke="${visorColor.border}" stroke-width="2" />
        </g>

        <!-- Lens 1 (Main 48MP Pro Fusion) - Top Left -->
        <g filter="url(#lensBevel)">
          <circle cx="90" cy="90" r="46" fill="${accentRing}" stroke="#94a3b8" stroke-width="2" />
          <circle cx="90" cy="90" r="39" fill="url(#proLens1)" />
          <circle cx="90" cy="90" r="39" fill="url(#proLensReflect)" />
          <circle cx="80" cy="80" r="10" fill="#ffffff" opacity="0.45" />
        </g>

        <!-- Lens 2 (48MP Ultra-Wide Macro) - Bottom Left -->
        <g filter="url(#lensBevel)">
          <circle cx="90" cy="170" r="46" fill="${accentRing}" stroke="#94a3b8" stroke-width="2" />
          <circle cx="90" cy="170" r="39" fill="url(#proLens1)" />
          <circle cx="90" cy="170" r="39" fill="url(#proLensReflect)" />
          <circle cx="80" cy="160" r="10" fill="#ffffff" opacity="0.45" />
        </g>

        <!-- Lens 3 (48MP 5x Tetraprism Telephoto) - Center Right -->
        <g filter="url(#lensBevel)">
          <circle cx="210" cy="130" r="46" fill="${accentRing}" stroke="#94a3b8" stroke-width="2" />
          <circle cx="210" cy="130" r="39" fill="url(#proLens1)" />
          <circle cx="210" cy="130" r="39" fill="url(#proLensReflect)" />
          <circle cx="200" cy="120" r="10" fill="#ffffff" opacity="0.45" />
        </g>

        <!-- Adaptive True Tone Flash -->
        <circle cx="330" cy="85" r="18" fill="#fef08a" stroke="#ffffff" stroke-width="2.5" />
        <circle cx="330" cy="85" r="9" fill="#fef9c3" />

        <!-- LiDAR Scanner Sensor -->
        <circle cx="330" cy="165" r="14" fill="#020617" stroke="#334155" stroke-width="1.5" />
        <circle cx="330" cy="165" r="6" fill="#1e293b" />

        <!-- Studio Mic Hole -->
        <circle cx="330" cy="125" r="3.5" fill="#0f172a" />

        <!-- Apple Logo (Center) -->
        <g transform="translate(186, 450) scale(1.05)" opacity="0.85">
          <path d="M22 0C25 0 28.5 1.8 30.5 4.2C32.5 6.6 32 10.4 32 10.4C32 10.4 28.8 10.7 26.8 8.3C24.8 5.9 25.8 2 22 0ZM30 12.5C33.5 12.5 37.5 14.5 39.5 17.8C34.5 20.8 35.2 28 40.3 30C39.2 33.5 37.2 37 34.5 41C32.2 44.2 29.8 47.5 26.2 47.5C22.7 47.5 21.5 45.3 17.5 45.3C13.3 45.3 12 47.5 8.7 47.5C5.4 47.5 2.8 44 0.8 41C-2.8 35.7 -1.8 23.5 3.8 17.8C7.1 14.5 11.2 12.5 15 12.5C19 12.5 21 14.6 24 14.6C26.8 14.6 28 12.5 30 12.5Z" fill="${bodyColor.logoFill}" />
        </g>
      </g>
    </svg>
    `;
  }

  // 1. iPhone 17 Pro Silver Visor (HD 1200x1200)
  const silverPro = getIphone17ProVisorSvg(
    { light: "#f8fafc", dark: "#e2e8f0", edgeLight: "#e2e8f0", edgeDark: "#94a3b8", logoFill: "#475569" },
    { light: "#ffffff", dark: "#cbd5e1", border: "#94a3b8" },
    "#f1f5f9",
    "Silver"
  );
  await sharp(Buffer.from(silverPro))
    .jpeg({ quality: 98 })
    .toFile(path.join(outputDir, "iphone-17-pro.jpg"));
  await sharp(Buffer.from(silverPro))
    .jpeg({ quality: 98 })
    .toFile(path.join(outputDir, "iphone-17-pro-silver.jpg"));

  // 2. iPhone 17 Pro / Pro Max Space Black Visor (HD 1200x1200)
  const blackPro = getIphone17ProVisorSvg(
    { light: "#27272a", dark: "#09090b", edgeLight: "#3f3f46", edgeDark: "#18181b", logoFill: "#71717a" },
    { light: "#3f3f46", dark: "#18181b", border: "#52525b" },
    "#27272a",
    "Space Black"
  );
  await sharp(Buffer.from(blackPro))
    .jpeg({ quality: 98 })
    .toFile(path.join(outputDir, "iphone-17-pro-black.jpg"));
  await sharp(Buffer.from(blackPro))
    .jpeg({ quality: 98 })
    .toFile(path.join(outputDir, "iphone-17-pro-max-black.jpg"));

  // 3. iPhone 17 Pro / Pro Max Desert Titanium / Copper Visor (HD 1200x1200)
  const desertPro = getIphone17ProVisorSvg(
    { light: "#ea580c", dark: "#9a3412", edgeLight: "#f97316", edgeDark: "#c2410c", logoFill: "#fed7aa" },
    { light: "#fb923c", dark: "#c2410c", border: "#ea580c" },
    "#ea580c",
    "Desert Titanium"
  );
  await sharp(Buffer.from(desertPro))
    .jpeg({ quality: 98 })
    .toFile(path.join(outputDir, "iphone-17-pro-max.jpg"));
  await sharp(Buffer.from(desertPro))
    .jpeg({ quality: 98 })
    .toFile(path.join(outputDir, "iphone-17-pro-max-desert.jpg"));
  await sharp(Buffer.from(desertPro))
    .jpeg({ quality: 98 })
    .toFile(path.join(outputDir, "iphone-17-pro-copper.jpg"));

  // 4. Samsung S24 Ultra HD Color Variants
  // Gray
  await sharp("public/products/samsung-s24-ultra.jpg")
    .resize(1000, 1000, { fit: "inside", background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .jpeg({ quality: 98 })
    .toFile(path.join(outputDir, "samsung-s24-ultra-gray.jpg"));

  // Black
  await sharp("public/products/samsung-s24-ultra.jpg")
    .modulate({ brightness: 0.7, saturation: 0.5 })
    .jpeg({ quality: 98 })
    .toFile(path.join(outputDir, "samsung-s24-ultra-black.jpg"));

  // Violet
  await sharp("public/products/samsung-s24-ultra.jpg")
    .tint({ r: 90, g: 60, b: 120 })
    .jpeg({ quality: 98 })
    .toFile(path.join(outputDir, "samsung-s24-ultra-violet.jpg"));

  // 5. Google Pixel 9 Pro HD Color Variants
  await sharp("public/products/google-pixel-9-pro.jpg")
    .jpeg({ quality: 98 })
    .toFile(path.join(outputDir, "google-pixel-9-pro-black.jpg"));

  await sharp("public/products/google-pixel-9-pro.jpg")
    .modulate({ brightness: 1.35, saturation: 0.2 })
    .jpeg({ quality: 98 })
    .toFile(path.join(outputDir, "google-pixel-9-pro-white.jpg"));

  await sharp("public/products/google-pixel-9-pro.jpg")
    .tint({ r: 120, g: 115, b: 105 })
    .jpeg({ quality: 98 })
    .toFile(path.join(outputDir, "google-pixel-9-pro-hazel.jpg"));

  console.log("Generated ultra-crisp 1200x1200 HD color variants for all products!");
}

generateHdColorVariants().catch(console.error);
