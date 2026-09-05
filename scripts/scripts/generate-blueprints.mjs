import sharp from "sharp";
import path from "path";
import fs from "fs";

async function createDiagrams() {
  const outputDir = "public/products";

  async function generateSvgTeardown(filename, title, subtitle, specs) {
    const specItems = specs.map((s, idx) => {
      const cleanName = s.name.replace(/&/g, "&amp;");
      const cleanDesc = s.desc.replace(/&/g, "&amp;");
      return `
      <g transform="translate(${40 + (idx % 2) * 440}, ${380 + Math.floor(idx / 2) * 80})">
        <rect width="400" height="65" rx="10" fill="#1e293b" stroke="#334155" stroke-width="1.5" />
        <circle cx="30" cy="32" r="14" fill="#6320EE" />
        <text x="30" y="37" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#ffffff" text-anchor="middle">${idx + 1}</text>
        <text x="56" y="26" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#f8fafc">${cleanName}</text>
        <text x="56" y="46" font-family="system-ui, sans-serif" font-size="11" fill="#94a3b8">${cleanDesc}</text>
      </g>
      `;
    }).join("");

    const cleanTitle = title.replace(/&/g, "&amp;");
    const cleanSubtitle = subtitle.replace(/&/g, "&amp;");

    const svg = `
    <svg width="960" height="720" viewBox="0 0 960 720" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#090d16" />
          <stop offset="100%" stop-color="#0f172a" />
        </linearGradient>
        <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#6320EE" />
          <stop offset="100%" stop-color="#a855f7" />
        </linearGradient>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" stroke-width="0.8" />
        </pattern>
      </defs>

      <rect width="960" height="720" fill="url(#bg)" />
      <rect width="960" height="720" fill="url(#grid)" />

      <!-- Header Banner -->
      <rect x="30" y="30" width="900" height="85" rx="14" fill="#1e293b" stroke="#334155" stroke-width="1.5" />
      <text x="55" y="65" font-family="system-ui, sans-serif" font-size="20" font-weight="900" fill="#ffffff" letter-spacing="0.5">${cleanTitle}</text>
      <text x="55" y="92" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#a855f7">${cleanSubtitle}</text>
      <rect x="760" y="52" width="145" height="36" rx="8" fill="url(#accent)" />
      <text x="832" y="75" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#ffffff" text-anchor="middle">HARDWARE BLUEPRINT</text>

      <!-- Center Technical Blueprint Schematic -->
      <g transform="translate(480, 240)">
        <rect x="-420" y="-105" width="840" height="210" rx="16" fill="#0b1120" stroke="#3b82f6" stroke-width="1.5" stroke-dasharray="6,4" />
        <circle cx="-250" cy="0" r="60" fill="#1e293b" stroke="#6320EE" stroke-width="2" />
        <rect x="-310" y="-60" width="120" height="120" rx="12" fill="#6320EE" fill-opacity="0.15" />
        <text x="-250" y="-10" font-family="system-ui, sans-serif" font-size="14" font-weight="bold" fill="#38bdf8" text-anchor="middle">CORE ENGINE</text>
        <text x="-250" y="15" font-family="system-ui, sans-serif" font-size="11" fill="#94a3b8" text-anchor="middle">Active Processing</text>

        <rect x="-80" y="-55" width="160" height="110" rx="10" fill="#1e293b" stroke="#10b981" stroke-width="2" />
        <text x="0" y="-10" font-family="system-ui, sans-serif" font-size="14" font-weight="bold" fill="#34d399" text-anchor="middle">THERMAL &amp; POWER</text>
        <text x="0" y="15" font-family="system-ui, sans-serif" font-size="11" fill="#94a3b8" text-anchor="middle">Multi-Cell Structure</text>

        <rect x="180" y="-55" width="160" height="110" rx="10" fill="#1e293b" stroke="#f59e0b" stroke-width="2" />
        <text x="260" y="-10" font-family="system-ui, sans-serif" font-size="14" font-weight="bold" fill="#fbbf24" text-anchor="middle">OUTPUT INTERFACE</text>
        <text x="260" y="15" font-family="system-ui, sans-serif" font-size="11" fill="#94a3b8" text-anchor="middle">Display / Audio / Actuator</text>

        <path d="M -190 0 L -80 0" stroke="#6320EE" stroke-width="3" />
        <path d="M 80 0 L 180 0" stroke="#10b981" stroke-width="3" />
      </g>

      <!-- Component Specs Grid -->
      ${specItems}

      <!-- Footer certification -->
      <text x="480" y="695" font-family="system-ui, sans-serif" font-size="11" font-weight="600" fill="#64748b" text-anchor="middle">1Fi Certified Hardware Architecture • Official Device Specifications</text>
    </svg>
    `;

    await sharp(Buffer.from(svg))
      .jpeg({ quality: 92 })
      .toFile(path.join(outputDir, filename));
    console.log(`Generated blueprint: ${filename}`);
  }

  // 1. MacBook Pro M3
  await generateSvgTeardown(
    "macbook-pro-m3-teardown.jpg",
    "APPLE MACBOOK PRO 14-INCH (M3 PRO) ARCHITECTURE",
    "Internal Unibody Teardown • Apple Silicon SoC • Liquid Retina XDR",
    [
      { name: "Apple M3 Pro 3nm SoC", desc: "12-core CPU, 18-core GPU with Ray Tracing & 150GB/s bandwidth" },
      { name: "Dual-Fan Thermal Architecture", desc: "Advanced heat pipes moving 50% more air quietly at low RPM" },
      { name: "Liquid Retina XDR Mini-LED", desc: "10,000 mini-LED zones, 1600 nits peak HDR, 120Hz ProMotion" },
      { name: "70Wh Lithium-Polymer Battery", desc: "High-density energy cells delivering up to 18 hours battery life" },
      { name: "Six-Speaker Sound System", desc: "Force-cancelling woofers with wide stereo & Spatial Audio" },
      { name: "MagSafe 3 & Thunderbolt 4 IO", desc: "High-speed 40Gbps data transfer, HDMI 2.1, and SDXC reader" },
    ]
  );

  // 2. Apple Watch Ultra 2
  await generateSvgTeardown(
    "apple-watch-ultra-2-teardown.jpg",
    "APPLE WATCH ULTRA 2 (49MM TITANIUM) ARCHITECTURE",
    "Rugged SiP Architecture • Dual-Frequency GPS • 3000 nits Sapphire Display",
    [
      { name: "Apple S9 SiP Dual-Core Processor", desc: "5.6 billion transistors, 4-core Neural Engine for on-device Siri & Double Tap" },
      { name: "49mm Grade 5 Titanium Enclosure", desc: "Raised bezel protecting the flat sapphire crystal front glass from edge impacts" },
      { name: "Precision Dual-Frequency GPS (L1+L5)", desc: "Custom helical antenna array calculating distance, pace, and route maps in dense cities" },
      { name: "3000 Nits Always-On LTPO OLED", desc: "Apple's brightest display with automatic Night Mode sensor switching" },
      { name: "Depth Gauge & Water Temp Sensor", desc: "EN13319 certified dive computer with real-time depth tracking up to 40 meters" },
      { name: "Dual Speakers & 3-Mic Beamforming", desc: "86-decibel emergency siren audible up to 180 meters away in wilderness" },
    ]
  );

  // 3. Sony WH-1000XM5
  await generateSvgTeardown(
    "sony-wh-1000xm5-teardown.jpg",
    "SONY WH-1000XM5 WIRELESS HEADPHONES ARCHITECTURE",
    "Dual Noise Cancelling Processors • 30mm Carbon Fiber Drivers • 8 Microphones",
    [
      { name: "HD Noise Cancelling Processor QN1", desc: "Custom processor dedicated to real-time inverse frequency noise suppression" },
      { name: "Integrated Processor V1", desc: "Unlocks the full potential of QN1 for unprecedented ambient noise isolation" },
      { name: "30mm Carbon Fiber Driver Unit", desc: "Lightweight rigid dome reproducing frequencies from 4Hz up to 40kHz (Hi-Res)" },
      { name: "8-Microphone Beamforming Array", desc: "4 microphones on each ear cup filtering wind noise and capturing vocal clarity" },
      { name: "30-Hour Fast Charging Battery", desc: "3 minutes of USB-PD charging provides 3 full hours of continuous audio playback" },
      { name: "Soft Fit Leather & Stepless Slider", desc: "Ergonomic pressure-relieving headband structure designed for all-day comfort" },
    ]
  );

  // 4. LG OLED C4 TV
  await generateSvgTeardown(
    "lg-oled-c4-teardown.jpg",
    "LG 55-INCH OLED EVO C4 4K SMART TV ARCHITECTURE",
    "Self-Lit OLED evo Panel • α9 AI Processor 4K Gen7 • Brightness Booster Max",
    [
      { name: "α9 AI Processor 4K Gen7", desc: "Deep-learning AI Super Upscaling, Dynamic Tone Mapping Pro, and Object Enhancing" },
      { name: "8.3 Million Self-Lit OLED Pixels", desc: "Individual pixel dimming achieving perfect infinite black levels and zero light bleed" },
      { name: "144Hz Gaming & 0.1ms Response", desc: "NVIDIA G-Sync, AMD FreeSync Premium, 4x HDMI 2.1 bandwidth ports" },
      { name: "Brightness Booster Architecture", desc: "Light-boosting algorithms delivering 30% higher peak highlights" },
      { name: "2.2 Channel Dolby Atmos Audio", desc: "AI Sound Pro virtually up-mixing audio into 9.1.2 surround sound immersion" },
      { name: "Ultra-Slim Metal Matrix Backplate", desc: "Minimalist aesthetic profile blending seamlessly with wall mounting systems" },
    ]
  );

  // 5. Dyson V15
  await generateSvgTeardown(
    "dyson-v15-teardown.jpg",
    "DYSON V15 DETECT CORDLESS VACUUM ARCHITECTURE",
    "Hyperdymium Digital Motor • Acoustic Piezo Sensor • 14 Root Cyclones",
    [
      { name: "Dyson Hyperdymium 125,000 RPM Motor", desc: "Spins at 125,000 RPM creating 230 Air Watts of powerful fade-free cyclone suction" },
      { name: "Acoustic Piezo Dust Sensor", desc: "Measures and counts dust particles 15,000 times/sec, automatically boosting suction" },
      { name: "14 Concentric Root Cyclones", desc: "Generates 100,000g of centrifugal force to fling dust straight into the bin" },
      { name: "Whole-Machine HEPA Filtration", desc: "Fully-sealed 5-stage filtration trapping 99.99% of microscopic particles down to 0.3μm" },
      { name: "Click-in 7-Cell High-Density Battery", desc: "Provides up to 60 minutes of uninterrupted whole-home deep cleaning power" },
      { name: "Fluffy Optic Laser Cleaner Head", desc: "Illuminates invisible dust on hard floors with precisely-angled green laser beam" },
    ]
  );
}

createDiagrams().catch(console.error);
