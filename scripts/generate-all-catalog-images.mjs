import sharp from "sharp";
import path from "path";

async function generateAllCatalogImages() {
  const outputDir = "public/products";

  function createStudioSvg(title, subtitle, bgColor, accentColor, iconSvg) {
    const cleanTitle = title.replace(/&/g, "&amp;");
    const cleanSubtitle = subtitle.replace(/&/g, "&amp;");

    return `
    <svg width="1000" height="1000" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="bgGlow" cx="50%" cy="45%" r="65%">
          <stop offset="0%" stop-color="#ffffff" />
          <stop offset="70%" stop-color="${bgColor}" />
          <stop offset="100%" stop-color="#e2e8f0" />
        </radialGradient>
        <filter id="cardShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="25" stdDeviation="20" flood-color="#0f172a" flood-opacity="0.18" />
        </filter>
      </defs>
      <rect width="1000" height="1000" fill="url(#bgGlow)" />
      
      <!-- Ambient Floor Shadow -->
      <ellipse cx="500" cy="850" rx="300" ry="30" fill="#0f172a" opacity="0.15" filter="blur(18px)" />

      <!-- Center Graphic Container -->
      <g filter="url(#cardShadow)" transform="translate(200, 150)">
        <rect x="0" y="0" width="600" height="600" rx="40" fill="#ffffff" stroke="${accentColor}" stroke-width="3" />
        <rect x="20" y="20" width="560" height="560" rx="30" fill="${bgColor}" opacity="0.3" />
        
        <!-- Icon / Art -->
        <g transform="translate(175, 120) scale(1.3)">
          ${iconSvg}
        </g>

        <!-- Labels -->
        <text x="300" y="440" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="900" fill="#0f172a" text-anchor="middle">
          ${cleanTitle}
        </text>
        <text x="300" y="480" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="600" fill="#64748b" text-anchor="middle">
          ${cleanSubtitle}
        </text>
        <rect x="220" y="515" width="160" height="34" rx="17" fill="${accentColor}" />
        <text x="300" y="538" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="800" fill="#ffffff" text-anchor="middle">
          0% MUTUAL FUND EMI
        </text>
      </g>
    </svg>
    `;
  }

  const items = [
    {
      name: "ipad-pro-m4.jpg",
      title: "Apple iPad Pro 11\" M4",
      subtitle: "Ultra Retina Tandem OLED • M4 Chip",
      bg: "#f1f5f9",
      accent: "#6320EE",
      icon: `<rect x="20" y="10" width="160" height="210" rx="16" fill="#1e293b" stroke="#94a3b8" stroke-width="4"/><rect x="30" y="20" width="140" height="190" rx="10" fill="#0f172a"/><circle cx="100" cy="115" r="30" fill="#6320EE" opacity="0.8"/>`,
    },
    {
      name: "samsung-z-fold-6.jpg",
      title: "Samsung Galaxy Z Fold 6",
      subtitle: "Dual Dynamic AMOLED 2X • Galaxy AI",
      bg: "#f8fafc",
      accent: "#2563eb",
      icon: `<rect x="20" y="10" width="80" height="210" rx="10" fill="#334155"/><rect x="100" y="10" width="80" height="210" rx="10" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><line x1="100" y1="10" x2="100" y2="220" stroke="#60a5fa" stroke-width="3"/>`,
    },
    {
      name: "magsafe-duo-charger.jpg",
      title: "Apple MagSafe Duo",
      subtitle: "Fast Wireless Charger for iPhone & Watch",
      bg: "#f8fafc",
      accent: "#0ea5e9",
      icon: `<rect x="20" y="40" width="160" height="100" rx="20" fill="#f8fafc" stroke="#cbd5e1" stroke-width="4"/><circle cx="65" cy="90" r="30" fill="#ffffff" stroke="#94a3b8" stroke-width="3"/><circle cx="135" cy="90" r="22" fill="#ffffff" stroke="#94a3b8" stroke-width="3"/>`,
    },
    {
      name: "anker-powercore-24k.jpg",
      title: "Anker 737 PowerCore 24K",
      subtitle: "140W Two-Way Fast Charging USB-C",
      bg: "#f1f5f9",
      accent: "#10b981",
      icon: `<rect x="50" y="20" width="100" height="180" rx="16" fill="#18181b" stroke="#3f3f46" stroke-width="4"/><rect x="65" y="40" width="70" height="45" rx="6" fill="#0284c7"/><text x="100" y="68" font-size="14" fill="#ffffff" font-weight="bold" text-anchor="middle">140W</text>`,
    },
    {
      name: "belkin-3in1-stand.jpg",
      title: "Belkin BoostCharge Pro",
      subtitle: "3-in-1 MagSafe 15W Wireless Stand",
      bg: "#f8fafc",
      accent: "#8b5cf6",
      icon: `<circle cx="100" cy="180" r="45" fill="#e2e8f0"/><path d="M100 180 L100 70" stroke="#94a3b8" stroke-width="8"/><circle cx="70" cy="60" r="28" fill="#ffffff" stroke="#8b5cf6" stroke-width="4"/><circle cx="130" cy="60" r="20" fill="#ffffff" stroke="#cbd5e1" stroke-width="3"/>`,
    },
    {
      name: "spigen-armor-case.jpg",
      title: "Spigen Ultra Hybrid Armor",
      subtitle: "Military Grade Drop & Air Cushion Case",
      bg: "#f8fafc",
      accent: "#3b82f6",
      icon: `<rect x="40" y="20" width="120" height="180" rx="20" fill="none" stroke="#3b82f6" stroke-width="6"/><rect x="50" y="30" width="100" height="160" rx="14" fill="#f1f5f9" opacity="0.6"/>`,
    },
    {
      name: "sandisk-duo-otg.jpg",
      title: "SanDisk Ultra Dual Luxe",
      subtitle: "256GB USB 3.1 Type-C & Type-A Metal",
      bg: "#f8fafc",
      accent: "#f59e0b",
      icon: `<rect x="60" y="60" width="80" height="100" rx="10" fill="#94a3b8" stroke="#64748b" stroke-width="4"/><rect x="80" y="35" width="40" height="25" rx="4" fill="#cbd5e1"/>`,
    },
    {
      name: "sony-ht-a7000-soundbar.jpg",
      title: "Sony HT-A7000 Soundbar",
      subtitle: "7.1.2ch 500W Dolby Atmos / DTS Cinema",
      bg: "#f1f5f9",
      accent: "#6320EE",
      icon: `<rect x="10" y="80" width="180" height="45" rx="10" fill="#18181b" stroke="#3f3f46" stroke-width="3"/><circle cx="40" cy="102" r="12" fill="#38bdf8"/><circle cx="100" cy="102" r="14" fill="#38bdf8"/><circle cx="160" cy="102" r="12" fill="#38bdf8"/>`,
    },
    {
      name: "logitech-mx-bundle.jpg",
      title: "Logitech MX Master 3S Bundle",
      subtitle: "Quiet Click Mouse & MX Mechanical Keyboard",
      bg: "#f8fafc",
      accent: "#10b981",
      icon: `<rect x="20" y="90" width="160" height="60" rx="8" fill="#334155"/><ellipse cx="140" cy="50" rx="20" ry="30" fill="#1e293b" stroke="#10b981" stroke-width="2"/>`,
    },
    {
      name: "daikin-1-5t-ac.jpg",
      title: "Daikin 1.5 Ton 5-Star AC",
      subtitle: "Inverter Split Air Conditioner with PM2.5",
      bg: "#f8fafc",
      accent: "#0ea5e9",
      icon: `<rect x="20" y="60" width="160" height="70" rx="8" fill="#ffffff" stroke="#94a3b8" stroke-width="4"/><line x1="30" y1="105" x2="170" y2="105" stroke="#0ea5e9" stroke-width="3"/><text x="150" y="85" font-size="10" fill="#10b981" font-weight="bold">5 Star</text>`,
    },
    {
      name: "samsung-french-door-fridge.jpg",
      title: "Samsung 580L French Door",
      subtitle: "Digital Inverter Smart Convertible Fridge",
      bg: "#f8fafc",
      accent: "#2563eb",
      icon: `<rect x="40" y="20" width="120" height="180" rx="10" fill="#334155" stroke="#94a3b8" stroke-width="3"/><line x1="100" y1="20" x2="100" y2="130" stroke="#cbd5e1" stroke-width="2"/><line x1="40" y1="130" x2="160" y2="130" stroke="#cbd5e1" stroke-width="2"/>`,
    },
    {
      name: "bosch-front-load-washer.jpg",
      title: "Bosch 8kg Front Load Washer",
      subtitle: "EcoSilence Drive Inverter 1400 RPM",
      bg: "#f8fafc",
      accent: "#dc2626",
      icon: `<rect x="40" y="20" width="120" height="170" rx="12" fill="#ffffff" stroke="#94a3b8" stroke-width="4"/><circle cx="100" cy="110" r="45" fill="#e2e8f0" stroke="#3b82f6" stroke-width="4"/><circle cx="100" cy="110" r="30" fill="#334155"/>`,
    },
    {
      name: "philips-mixer-grinder.jpg",
      title: "Philips 750W Juicer Mixer",
      subtitle: "4-Jar Heavy Duty Stainless Steel Grinder",
      bg: "#f8fafc",
      accent: "#f97316",
      icon: `<rect x="60" y="110" width="80" height="70" rx="12" fill="#ffffff" stroke="#f97316" stroke-width="4"/><rect x="70" y="40" width="60" height="70" rx="6" fill="#cbd5e1" stroke="#64748b" stroke-width="2"/>`,
    },
    {
      name: "delonghi-espresso-maker.jpg",
      title: "De'Longhi Magnifica S",
      subtitle: "Automatic Bean-to-Cup Espresso Machine",
      bg: "#f8fafc",
      accent: "#854d0e",
      icon: `<rect x="50" y="30" width="100" height="160" rx="14" fill="#1e293b" stroke="#94a3b8" stroke-width="3"/><rect x="70" y="90" width="60" height="40" rx="4" fill="#f8fafc"/>`,
    },
    {
      name: "havells-bldc-fan.jpg",
      title: "Havells BLDC Inverter Fan",
      subtitle: "Smart 5-Star Energy Saver Ceiling Fan",
      bg: "#f8fafc",
      accent: "#10b981",
      icon: `<circle cx="100" cy="100" r="24" fill="#334155" stroke="#10b981" stroke-width="4"/><line x1="100" y1="76" x2="100" y2="20" stroke="#64748b" stroke-width="8"/><line x1="80" y1="115" x2="30" y2="160" stroke="#64748b" stroke-width="8"/><line x1="120" y1="115" x2="170" y2="160" stroke="#64748b" stroke-width="8"/>`,
    },
  ];

  for (const item of items) {
    const svg = createStudioSvg(item.title, item.subtitle, item.bg, item.accent, item.icon);
    await sharp(Buffer.from(svg))
      .jpeg({ quality: 98 })
      .toFile(path.join(outputDir, item.name));
    console.log(`Saved ${item.name}`);
  }

  console.log("All catalog subcategory images successfully generated!");
}

generateAllCatalogImages().catch(console.error);
