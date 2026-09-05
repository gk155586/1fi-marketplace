import sharp from "sharp";
import path from "path";

async function generateHeroShoppingBag() {
  const outputDir = "public";

  const svg = `
  <svg width="800" height="700" viewBox="0 0 800 700" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Gradients -->
      <linearGradient id="goldBag" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#FCD34D" />
        <stop offset="50%" stop-color="#F59E0B" />
        <stop offset="100%" stop-color="#D97706" />
      </linearGradient>

      <linearGradient id="redCar" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#EF4444" />
        <stop offset="50%" stop-color="#DC2626" />
        <stop offset="100%" stop-color="#991B1B" />
      </linearGradient>

      <linearGradient id="laptopScreen" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#818CF8" />
        <stop offset="50%" stop-color="#C084FC" />
        <stop offset="100%" stop-color="#E879F9" />
      </linearGradient>

      <linearGradient id="phoneScreen" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#38BDF8" />
        <stop offset="100%" stop-color="#818CF8" />
      </linearGradient>

      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="15" stdDeviation="20" flood-color="#000000" flood-opacity="0.35" />
      </filter>
    </defs>

    <!-- Confetti Ribbons -->
    <path d="M120 180 Q200 120 280 200 T440 160" fill="none" stroke="#FBBF24" stroke-width="12" stroke-linecap="round" opacity="0.85" />
    <path d="M620 120 Q680 180 720 140 T780 220" fill="none" stroke="#FDE68A" stroke-width="8" stroke-linecap="round" opacity="0.85" />
    <path d="M50 420 Q120 360 180 440" fill="none" stroke="#F59E0B" stroke-width="10" stroke-linecap="round" opacity="0.8" />
    <path d="M680 400 Q740 460 790 380" fill="none" stroke="#FCD34D" stroke-width="14" stroke-linecap="round" opacity="0.75" />

    <!-- Sparkles -->
    <polygon points="250,90 256,105 271,111 256,117 250,132 244,117 229,111 244,105" fill="#FEF08A" />
    <polygon points="680,80 684,92 696,96 684,100 680,112 676,100 664,96 676,92" fill="#FEF08A" />
    <polygon points="560,40 564,52 576,56 564,60 560,72 556,60 544,56 556,52" fill="#FFFFFF" />

    <!-- Floating Laptop -->
    <g transform="translate(420, 80) rotate(12)" filter="url(#glow)">
      <!-- Base -->
      <polygon points="20,180 240,180 260,200 0,200" fill="#CBD5E1" stroke="#94A3B8" stroke-width="2" />
      <!-- Screen Lid -->
      <polygon points="30,20 230,20 240,180 20,180" fill="#0F172A" stroke="#475569" stroke-width="3" />
      <!-- Display -->
      <polygon points="38,28 222,28 232,172 28,172" fill="url(#laptopScreen)" />
      <circle cx="130" cy="100" r="28" fill="#FFFFFF" opacity="0.25" />
    </g>

    <!-- Floating Smartphone -->
    <g transform="translate(240, 70) rotate(-14)" filter="url(#glow)">
      <rect x="0" y="0" width="110" height="210" rx="22" fill="#0F172A" stroke="#CBD5E1" stroke-width="3" />
      <rect x="6" y="6" width="98" height="198" rx="18" fill="url(#phoneScreen)" />
      <!-- Island -->
      <rect x="35" y="14" width="40" height="12" rx="6" fill="#000000" />
    </g>

    <!-- Sports Car & Superbike Graphic Behind Bag -->
    <g transform="translate(180, 160)" filter="url(#glow)">
      <!-- Red Sports Car Silhouette -->
      <path d="M20 120 Q60 80 140 75 Q220 70 290 95 L340 120 L350 145 L0 145 Z" fill="url(#redCar)" />
      <polygon points="90,82 170,80 210,105 70,105" fill="#0F172A" />
      <circle cx="70" cy="145" r="24" fill="#18181B" stroke="#CBD5E1" stroke-width="4" />
      <circle cx="270" cy="145" r="24" fill="#18181B" stroke="#CBD5E1" stroke-width="4" />
    </g>

    <!-- White Superbike (Right) -->
    <g transform="translate(480, 140)" filter="url(#glow)">
      <circle cx="40" cy="130" r="26" fill="#18181B" stroke="#E2E8F0" stroke-width="5" />
      <circle cx="160" cy="130" r="26" fill="#18181B" stroke="#E2E8F0" stroke-width="5" />
      <path d="M40 130 L90 80 L130 90 L160 130" fill="none" stroke="#FFFFFF" stroke-width="8" stroke-linecap="round" />
      <polygon points="70,75 120,70 140,95 80,95" fill="#E2E8F0" />
      <rect x="110" y="60" width="30" height="10" rx="4" fill="#EF4444" />
    </g>

    <!-- Golden Gift Shopping Bag (Front & Center) -->
    <g transform="translate(240, 220)" filter="url(#glow)">
      <!-- Bag Handles -->
      <path d="M100 20 Q160 -40 220 20" fill="none" stroke="#FEF3C7" stroke-width="12" stroke-linecap="round" />
      <!-- Bag Body -->
      <polygon points="40,20 280,20 310,340 10,340" fill="url(#goldBag)" stroke="#FDE68A" stroke-width="3" />
      <polygon points="40,20 280,20 290,60 30,60" fill="#FBBF24" />
      <!-- Bag Crease Shadow -->
      <polygon points="160,20 160,340 180,340 170,20" fill="#D97706" opacity="0.3" />
      <!-- Hanging Handle Rings -->
      <circle cx="100" cy="35" r="8" fill="#B45309" />
      <circle cx="220" cy="35" r="8" fill="#B45309" />
    </g>
  </svg>
  `;

  await sharp(Buffer.from(svg))
    .png({ quality: 98 })
    .toFile(path.join(outputDir, "hero-shopping-bag.png"));

  console.log("Saved public/hero-shopping-bag.png successfully!");
}

generateHeroShoppingBag().catch(console.error);
