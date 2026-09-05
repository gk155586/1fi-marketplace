import sharp from "sharp";
import path from "path";

async function createStudioRender() {
  const outputDir = "public/products";

  // Create an ultra-crisp, studio-grade render of iPhone 17 with vertical capsule camera
  function getIphone17Svg(colorHex, colorAccent, modelName) {
    return `
    <svg width="800" height="800" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Shadow -->
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="25" stdDeviation="20" flood-color="#0f172a" flood-opacity="0.18" />
        </filter>
        <filter id="lensGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="#000000" flood-opacity="0.35" />
        </filter>
        
        <!-- Phone Gradients -->
        <linearGradient id="bodyGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${colorHex}" />
          <stop offset="100%" stop-color="${colorAccent}" />
        </linearGradient>

        <linearGradient id="edgeGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#cbd5e1" />
          <stop offset="50%" stop-color="#ffffff" />
          <stop offset="100%" stop-color="#94a3b8" />
        </linearGradient>

        <linearGradient id="cameraIslandGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#f8fafc" />
          <stop offset="100%" stop-color="#e2e8f0" />
        </linearGradient>

        <radialGradient id="lens1" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#334155" />
          <stop offset="40%" stop-color="#0f172a" />
          <stop offset="100%" stop-color="#020617" />
        </radialGradient>

        <radialGradient id="lensReflect" cx="30%" cy="30%" r="50%">
          <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.6" />
          <stop offset="50%" stop-color="#818cf8" stop-opacity="0.2" />
          <stop offset="100%" stop-color="#020617" stop-opacity="0" />
        </radialGradient>
      </defs>

      <!-- Pure White Background -->
      <rect width="800" height="800" fill="#ffffff" />

      <!-- Ambient Drop Shadow under phone -->
      <ellipse cx="400" cy="710" rx="160" ry="18" fill="#0f172a" opacity="0.12" filter="blur(10px)" />
      <ellipse cx="400" cy="705" rx="120" ry="10" fill="#0f172a" opacity="0.18" filter="blur(5px)" />

      <!-- Main Phone Body with Shadow -->
      <g filter="url(#shadow)" transform="translate(260, 110)">
        <!-- Outer Aluminum Edge (Round Rect) -->
        <rect x="0" y="0" width="280" height="570" rx="52" fill="url(#edgeGrad)" stroke="#cbd5e1" stroke-width="1.5" />
        
        <!-- Matte Back Glass Surface -->
        <rect x="4" y="4" width="272" height="562" rx="48" fill="url(#bodyGrad)" />

        <!-- Vertical Pill Camera Capsule Island -->
        <g filter="url(#lensGlow)">
          <rect x="24" y="24" width="76" height="152" rx="38" fill="url(#cameraIslandGrad)" stroke="#cbd5e1" stroke-width="1.5" />
          <rect x="26" y="26" width="72" height="148" rx="36" fill="${colorHex}" opacity="0.6" />
        </g>

        <!-- Top Camera Lens (Main 48MP Fusion) -->
        <circle cx="62" cy="62" r="28" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1" />
        <circle cx="62" cy="62" r="24" fill="url(#lens1)" />
        <circle cx="62" cy="62" r="24" fill="url(#lensReflect)" />
        <circle cx="56" cy="56" r="6" fill="#ffffff" opacity="0.4" />

        <!-- Bottom Camera Lens (Ultra-wide 12MP with Macro) -->
        <circle cx="62" cy="138" r="28" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1" />
        <circle cx="62" cy="138" r="24" fill="url(#lens1)" />
        <circle cx="62" cy="138" r="24" fill="url(#lensReflect)" />
        <circle cx="56" cy="132" r="6" fill="#ffffff" opacity="0.4" />

        <!-- True Tone Flash & Mic beside pill -->
        <circle cx="124" cy="62" r="9" fill="#fef08a" stroke="#e2e8f0" stroke-width="2" />
        <circle cx="124" cy="62" r="4" fill="#fef9c3" />
        <circle cx="124" cy="115" r="3.5" fill="#1e293b" />

        <!-- Apple Logo (Center) -->
        <g transform="translate(126, 260) scale(0.65)" opacity="0.8">
          <path d="M15.5 0C17.5 0 20.2 1.2 21.6 2.9C23.1 4.6 22.8 7.3 22.8 7.3C22.8 7.3 20.4 7.5 19 5.8C17.6 4.1 18.2 1.4 15.5 0ZM21.2 8.7C23.7 8.7 26.5 10.1 27.9 12.4C24.4 14.5 24.9 19.5 28.5 20.9C27.7 23.3 26.3 25.8 24.4 28.5C22.8 30.8 21.1 33.1 18.6 33.1C16.1 33.1 15.3 31.6 12.4 31.6C9.5 31.6 8.5 33.1 6.2 33.1C3.9 33.1 2.1 30.6 0.7 28.5C-1.8 24.8 -1.2 16.4 2.8 12.4C5.1 10.1 8 8.7 10.7 8.7C13.5 8.7 14.9 10.2 17 10.2C19 10.2 19.8 8.7 21.2 8.7Z" fill="#334155" />
        </g>
      </g>
    </svg>
    `;
  }

  // Generate White, Blue, and Black studio images
  const whiteSvg = getIphone17Svg("#f8fafc", "#e2e8f0", "Starlight White");
  const blueSvg = getIphone17Svg("#60a5fa", "#2563eb", "Ultramarine Blue");
  const blackSvg = getIphone17Svg("#334155", "#0f172a", "Midnight Black");

  await sharp(Buffer.from(whiteSvg))
    .jpeg({ quality: 95 })
    .toFile(path.join(outputDir, "iphone-17.jpg"));

  await sharp(Buffer.from(whiteSvg))
    .jpeg({ quality: 95 })
    .toFile(path.join(outputDir, "iphone-17-white.jpg"));

  await sharp(Buffer.from(blueSvg))
    .jpeg({ quality: 95 })
    .toFile(path.join(outputDir, "iphone-17-blue.jpg"));

  await sharp(Buffer.from(blackSvg))
    .jpeg({ quality: 95 })
    .toFile(path.join(outputDir, "iphone-17-black.jpg"));

  console.log("Successfully created pristine studio renders for iPhone 17!");
}

createStudioRender().catch(console.error);
