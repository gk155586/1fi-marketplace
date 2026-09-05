import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.emiPlan.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.product.deleteMany();

  const iphone16ProGallery = JSON.stringify(["/products/iphone-16-pro.jpg"]);
  const iphone16Gallery = JSON.stringify(["/products/iphone-16.jpg"]);
  const macbookGallery = JSON.stringify(["/products/macbook-pro-m3.jpg"]);
  const watchGallery = JSON.stringify(["/products/apple-watch-ultra-2.jpg"]);
  const sonyGallery = JSON.stringify(["/products/sony-wh-1000xm5.jpg"]);
  const tvGallery = JSON.stringify(["/products/lg-oled-c4.jpg"]);
  const dysonGallery = JSON.stringify(["/products/dyson-v15.jpg"]);

  // 1. Apple iPhone 17 Pro Max
  await prisma.product.create({
    data: {
      slug: "iphone-17-pro-max",
      name: "Apple iPhone 17 Pro Max",
      brand: "Apple",
      category: "mobiles",
      description: "Massive 6.9-inch Super Retina XDR OLED, A19 Pro chip, revolutionary horizontal Pro camera visor array, and all-day 33-hour battery life.",
      badge: "ULTRA FLAGSHIP",
      rating: 4.9,
      reviewCount: 3120,
      variants: {
        create: [
          { colorName: "Desert Titanium", colorHex: "#D97706", storage: "256GB", price: 144900, mrp: 154900, imageUrl: "/products/iphone-17-pro-max-desert.jpg", galleryImages: JSON.stringify(["/products/iphone-17-pro-max-desert.jpg", "/products/iphone-17-pro-max-black.jpg", "/products/iphone-17-pro-silver.jpg"]), stockQuantity: 35, isDefault: true },
          { colorName: "Desert Titanium", colorHex: "#D97706", storage: "512GB", price: 164900, mrp: 174900, imageUrl: "/products/iphone-17-pro-max-desert.jpg", galleryImages: JSON.stringify(["/products/iphone-17-pro-max-desert.jpg", "/products/iphone-17-pro-max-black.jpg", "/products/iphone-17-pro-silver.jpg"]), stockQuantity: 20 },
          { colorName: "Desert Titanium", colorHex: "#D97706", storage: "1TB", price: 184900, mrp: 194900, imageUrl: "/products/iphone-17-pro-max-desert.jpg", galleryImages: JSON.stringify(["/products/iphone-17-pro-max-desert.jpg", "/products/iphone-17-pro-max-black.jpg", "/products/iphone-17-pro-silver.jpg"]), stockQuantity: 15 },
          { colorName: "Space Black", colorHex: "#2E2C2D", storage: "256GB", price: 144900, mrp: 154900, imageUrl: "/products/iphone-17-pro-max-black.jpg", galleryImages: JSON.stringify(["/products/iphone-17-pro-max-black.jpg", "/products/iphone-17-pro-max-desert.jpg", "/products/iphone-17-pro-silver.jpg"]), stockQuantity: 28 },
          { colorName: "Space Black", colorHex: "#2E2C2D", storage: "512GB", price: 164900, mrp: 174900, imageUrl: "/products/iphone-17-pro-max-black.jpg", galleryImages: JSON.stringify(["/products/iphone-17-pro-max-black.jpg", "/products/iphone-17-pro-max-desert.jpg", "/products/iphone-17-pro-silver.jpg"]), stockQuantity: 16 },
          { colorName: "Space Black", colorHex: "#2E2C2D", storage: "1TB", price: 184900, mrp: 194900, imageUrl: "/products/iphone-17-pro-max-black.jpg", galleryImages: JSON.stringify(["/products/iphone-17-pro-max-black.jpg", "/products/iphone-17-pro-max-desert.jpg", "/products/iphone-17-pro-silver.jpg"]), stockQuantity: 10 },
          { colorName: "Silver", colorHex: "#D8D9DA", storage: "256GB", price: 144900, mrp: 154900, imageUrl: "/products/iphone-17-pro-silver.jpg", galleryImages: JSON.stringify(["/products/iphone-17-pro-silver.jpg", "/products/iphone-17-pro-max-desert.jpg", "/products/iphone-17-pro-max-black.jpg"]), stockQuantity: 22 },
          { colorName: "Silver", colorHex: "#D8D9DA", storage: "512GB", price: 164900, mrp: 174900, imageUrl: "/products/iphone-17-pro-silver.jpg", galleryImages: JSON.stringify(["/products/iphone-17-pro-silver.jpg", "/products/iphone-17-pro-max-desert.jpg", "/products/iphone-17-pro-max-black.jpg"]), stockQuantity: 14 },
          { colorName: "Silver", colorHex: "#D8D9DA", storage: "1TB", price: 184900, mrp: 194900, imageUrl: "/products/iphone-17-pro-silver.jpg", galleryImages: JSON.stringify(["/products/iphone-17-pro-silver.jpg", "/products/iphone-17-pro-max-desert.jpg", "/products/iphone-17-pro-max-black.jpg"]), stockQuantity: 8 },
        ],
      },
      emiPlans: {
        create: [
          { tenureMonths: 6, monthlyAmount: 24150, interestRate: 0.0, cashbackAmount: 8500, isZeroInterest: true, minMfPledge: 215000 },
          { tenureMonths: 12, monthlyAmount: 12075, interestRate: 0.0, cashbackAmount: 8500, isZeroInterest: true, minMfPledge: 215000 },
          { tenureMonths: 24, monthlyAmount: 6038, interestRate: 0.0, cashbackAmount: 8500, isZeroInterest: true, minMfPledge: 215000 },
        ],
      },
    },
  });

  // 2. Apple iPhone 17 Pro
  await prisma.product.create({
    data: {
      slug: "iphone-17-pro",
      name: "Apple iPhone 17 Pro",
      brand: "Apple",
      category: "mobiles",
      description: "Super Retina XDR display with ProMotion, A19 Pro chip, new horizontal camera visor architecture, and mutual fund zero-interest EMI financing.",
      badge: "NEW",
      rating: 4.9,
      reviewCount: 2450,
      variants: {
        create: [
          { colorName: "Desert Copper", colorHex: "#D97706", storage: "128GB", price: 119900, mrp: 124900, imageUrl: "/products/iphone-17-pro-copper.jpg", galleryImages: JSON.stringify(["/products/iphone-17-pro-copper.jpg", "/products/iphone-17-pro-visor.jpg", "/products/iphone-17-pro-cinema.jpg", "/products/iphone-17-pro-silver.jpg", "/products/iphone-17-pro-black.jpg"]), stockQuantity: 25 },
          { colorName: "Desert Copper", colorHex: "#D97706", storage: "256GB", price: 127400, mrp: 134900, imageUrl: "/products/iphone-17-pro-copper.jpg", galleryImages: JSON.stringify(["/products/iphone-17-pro-copper.jpg", "/products/iphone-17-pro-visor.jpg", "/products/iphone-17-pro-cinema.jpg", "/products/iphone-17-pro-silver.jpg", "/products/iphone-17-pro-black.jpg"]), stockQuantity: 40, isDefault: true },
          { colorName: "Desert Copper", colorHex: "#D97706", storage: "512GB", price: 147400, mrp: 154900, imageUrl: "/products/iphone-17-pro-copper.jpg", galleryImages: JSON.stringify(["/products/iphone-17-pro-copper.jpg", "/products/iphone-17-pro-visor.jpg", "/products/iphone-17-pro-cinema.jpg", "/products/iphone-17-pro-silver.jpg", "/products/iphone-17-pro-black.jpg"]), stockQuantity: 20 },
          { colorName: "Silver", colorHex: "#D8D9DA", storage: "128GB", price: 119900, mrp: 124900, imageUrl: "/products/iphone-17-pro-silver.jpg", galleryImages: JSON.stringify(["/products/iphone-17-pro-silver.jpg", "/products/iphone-17-pro-profile.jpg", "/products/iphone-17-pro-copper.jpg", "/products/iphone-17-pro-cinema.jpg", "/products/iphone-17-pro-black.jpg"]), stockQuantity: 30 },
          { colorName: "Silver", colorHex: "#D8D9DA", storage: "256GB", price: 127400, mrp: 134900, imageUrl: "/products/iphone-17-pro-silver.jpg", galleryImages: JSON.stringify(["/products/iphone-17-pro-silver.jpg", "/products/iphone-17-pro-profile.jpg", "/products/iphone-17-pro-copper.jpg", "/products/iphone-17-pro-cinema.jpg", "/products/iphone-17-pro-black.jpg"]), stockQuantity: 35 },
          { colorName: "Silver", colorHex: "#D8D9DA", storage: "512GB", price: 147400, mrp: 154900, imageUrl: "/products/iphone-17-pro-silver.jpg", galleryImages: JSON.stringify(["/products/iphone-17-pro-silver.jpg", "/products/iphone-17-pro-profile.jpg", "/products/iphone-17-pro-copper.jpg", "/products/iphone-17-pro-cinema.jpg", "/products/iphone-17-pro-black.jpg"]), stockQuantity: 18 },
          { colorName: "Space Black", colorHex: "#2E2C2D", storage: "128GB", price: 119900, mrp: 124900, imageUrl: "/products/iphone-17-pro-black.jpg", galleryImages: JSON.stringify(["/products/iphone-17-pro-black.jpg", "/products/iphone-17-pro-display.jpg", "/products/iphone-17-pro-copper.jpg", "/products/iphone-17-pro-cinema.jpg", "/products/iphone-17-pro-silver.jpg"]), stockQuantity: 25 },
          { colorName: "Space Black", colorHex: "#2E2C2D", storage: "256GB", price: 127400, mrp: 134900, imageUrl: "/products/iphone-17-pro-black.jpg", galleryImages: JSON.stringify(["/products/iphone-17-pro-black.jpg", "/products/iphone-17-pro-display.jpg", "/products/iphone-17-pro-copper.jpg", "/products/iphone-17-pro-cinema.jpg", "/products/iphone-17-pro-silver.jpg"]), stockQuantity: 35 },
          { colorName: "Space Black", colorHex: "#2E2C2D", storage: "512GB", price: 147400, mrp: 154900, imageUrl: "/products/iphone-17-pro-black.jpg", galleryImages: JSON.stringify(["/products/iphone-17-pro-black.jpg", "/products/iphone-17-pro-display.jpg", "/products/iphone-17-pro-copper.jpg", "/products/iphone-17-pro-cinema.jpg", "/products/iphone-17-pro-silver.jpg"]), stockQuantity: 15 },
        ],
      },
      emiPlans: {
        create: [
          { tenureMonths: 6, monthlyAmount: 19111, interestRate: 0.0, cashbackAmount: 7500, isZeroInterest: true, minMfPledge: 190000 },
          { tenureMonths: 9, monthlyAmount: 12741, interestRate: 0.0, cashbackAmount: 7500, isZeroInterest: true, minMfPledge: 190000 },
          { tenureMonths: 12, monthlyAmount: 9555, interestRate: 0.0, cashbackAmount: 7500, isZeroInterest: true, minMfPledge: 190000 },
          { tenureMonths: 24, monthlyAmount: 5621, interestRate: 0.0, cashbackAmount: 7500, isZeroInterest: true, minMfPledge: 190000 },
        ],
      },
    },
  });

  // 3. Apple iPhone 17 (Mist Blue)
  await prisma.product.create({
    data: {
      slug: "iphone-17",
      name: "Apple iPhone 17",
      brand: "Apple",
      category: "mobiles",
      description: "Next-gen vertical capsule dual camera with spatial video capture, Apple A19 3nm chip, and Super Retina OLED display.",
      badge: "NEW ARRIVAL",
      rating: 4.8,
      reviewCount: 1420,
      variants: {
        create: [
          { colorName: "Mist Blue", colorHex: "#93C5FD", storage: "128GB", price: 79900, mrp: 84900, imageUrl: "/products/iphone-17-mist-blue.jpg", galleryImages: JSON.stringify(["/products/iphone-17-mist-blue.jpg", "/products/iphone-17-camera.jpg", "/products/iphone-17-shield.jpg", "/products/iphone-17-inhand.jpg", "/products/iphone-17-island.jpg"]), stockQuantity: 40 },
          { colorName: "Mist Blue", colorHex: "#93C5FD", storage: "256GB", price: 89900, mrp: 94900, imageUrl: "/products/iphone-17-mist-blue.jpg", galleryImages: JSON.stringify(["/products/iphone-17-mist-blue.jpg", "/products/iphone-17-camera.jpg", "/products/iphone-17-shield.jpg", "/products/iphone-17-inhand.jpg", "/products/iphone-17-island.jpg"]), stockQuantity: 35, isDefault: true },
          { colorName: "Mist Blue", colorHex: "#93C5FD", storage: "512GB", price: 109900, mrp: 114900, imageUrl: "/products/iphone-17-mist-blue.jpg", galleryImages: JSON.stringify(["/products/iphone-17-mist-blue.jpg", "/products/iphone-17-camera.jpg", "/products/iphone-17-shield.jpg", "/products/iphone-17-inhand.jpg", "/products/iphone-17-island.jpg"]), stockQuantity: 20 },
          { colorName: "Starlight White", colorHex: "#F8FAFC", storage: "128GB", price: 79900, mrp: 84900, imageUrl: "/products/iphone-17-white.jpg", galleryImages: JSON.stringify(["/products/iphone-17-white.jpg", "/products/iphone-17-camera.jpg", "/products/iphone-17-mist-blue.jpg", "/products/iphone-17-inhand.jpg", "/products/iphone-17-shield.jpg"]), stockQuantity: 45 },
          { colorName: "Starlight White", colorHex: "#F8FAFC", storage: "256GB", price: 89900, mrp: 94900, imageUrl: "/products/iphone-17-white.jpg", galleryImages: JSON.stringify(["/products/iphone-17-white.jpg", "/products/iphone-17-camera.jpg", "/products/iphone-17-mist-blue.jpg", "/products/iphone-17-inhand.jpg", "/products/iphone-17-shield.jpg"]), stockQuantity: 25 },
          { colorName: "Starlight White", colorHex: "#F8FAFC", storage: "512GB", price: 109900, mrp: 114900, imageUrl: "/products/iphone-17-white.jpg", galleryImages: JSON.stringify(["/products/iphone-17-white.jpg", "/products/iphone-17-camera.jpg", "/products/iphone-17-mist-blue.jpg", "/products/iphone-17-inhand.jpg", "/products/iphone-17-shield.jpg"]), stockQuantity: 15 },
          { colorName: "Midnight Black", colorHex: "#1F2937", storage: "128GB", price: 79900, mrp: 84900, imageUrl: "/products/iphone-17-black.jpg", galleryImages: JSON.stringify(["/products/iphone-17-black.jpg", "/products/iphone-17-island.jpg", "/products/iphone-17-mist-blue.jpg", "/products/iphone-17-camera.jpg", "/products/iphone-17-inhand.jpg"]), stockQuantity: 35 },
          { colorName: "Midnight Black", colorHex: "#1F2937", storage: "256GB", price: 89900, mrp: 94900, imageUrl: "/products/iphone-17-black.jpg", galleryImages: JSON.stringify(["/products/iphone-17-black.jpg", "/products/iphone-17-island.jpg", "/products/iphone-17-mist-blue.jpg", "/products/iphone-17-camera.jpg", "/products/iphone-17-inhand.jpg"]), stockQuantity: 20 },
          { colorName: "Midnight Black", colorHex: "#1F2937", storage: "512GB", price: 109900, mrp: 114900, imageUrl: "/products/iphone-17-black.jpg", galleryImages: JSON.stringify(["/products/iphone-17-black.jpg", "/products/iphone-17-island.jpg", "/products/iphone-17-mist-blue.jpg", "/products/iphone-17-camera.jpg", "/products/iphone-17-inhand.jpg"]), stockQuantity: 10 },
        ],
      },
      emiPlans: {
        create: [
          { tenureMonths: 6, monthlyAmount: 14983, interestRate: 0.0, cashbackAmount: 4500, isZeroInterest: true, minMfPledge: 135000 },
          { tenureMonths: 12, monthlyAmount: 7491, interestRate: 0.0, cashbackAmount: 4500, isZeroInterest: true, minMfPledge: 135000 },
        ],
      },
    },
  });

  // 4. Apple iPhone 17 Air (Ultra-Slim 5.5mm Titanium)
  await prisma.product.create({
    data: {
      slug: "iphone-17-air",
      name: "Apple iPhone 17 Air",
      brand: "Apple",
      category: "mobiles",
      description: "Razor-thin 5.5mm titanium design, Apple A19 Pro 3nm chip, 6.6-inch Super Retina XDR with 120Hz ProMotion, and eSIM-only architecture.",
      badge: "ULTRA SLIM",
      rating: 4.9,
      reviewCount: 1280,
      variants: {
        create: [
          { colorName: "Cloud White", colorHex: "#F1F5F9", storage: "256GB", price: 99900, mrp: 109900, imageUrl: "/products/iphone-17-air-cloud-white.jpg", galleryImages: JSON.stringify(["/products/iphone-17-air-cloud-white.jpg", "/products/iphone-17-air-profile.jpg", "/products/iphone-17-air-sky.jpg", "/products/iphone-17-air-space-black.jpg", "/products/iphone-17-air-esim.jpg"]), stockQuantity: 35, isDefault: true },
          { colorName: "Cloud White", colorHex: "#F1F5F9", storage: "512GB", price: 119900, mrp: 129900, imageUrl: "/products/iphone-17-air-cloud-white.jpg", galleryImages: JSON.stringify(["/products/iphone-17-air-cloud-white.jpg", "/products/iphone-17-air-profile.jpg", "/products/iphone-17-air-sky.jpg", "/products/iphone-17-air-space-black.jpg", "/products/iphone-17-air-esim.jpg"]), stockQuantity: 20 },
          { colorName: "Cloud White", colorHex: "#F1F5F9", storage: "1TB", price: 139900, mrp: 149900, imageUrl: "/products/iphone-17-air-cloud-white.jpg", galleryImages: JSON.stringify(["/products/iphone-17-air-cloud-white.jpg", "/products/iphone-17-air-profile.jpg", "/products/iphone-17-air-sky.jpg", "/products/iphone-17-air-space-black.jpg", "/products/iphone-17-air-esim.jpg"]), stockQuantity: 10 },
          { colorName: "Sky Blue", colorHex: "#BAE6FD", storage: "256GB", price: 99900, mrp: 109900, imageUrl: "/products/iphone-17-air-sky.jpg", galleryImages: JSON.stringify(["/products/iphone-17-air-sky.jpg", "/products/iphone-17-air-cloud-white.jpg", "/products/iphone-17-air-profile.jpg", "/products/iphone-17-air-space-black.jpg", "/products/iphone-17-air-esim.jpg"]), stockQuantity: 30 },
          { colorName: "Sky Blue", colorHex: "#BAE6FD", storage: "512GB", price: 119900, mrp: 129900, imageUrl: "/products/iphone-17-air-sky.jpg", galleryImages: JSON.stringify(["/products/iphone-17-air-sky.jpg", "/products/iphone-17-air-cloud-white.jpg", "/products/iphone-17-air-profile.jpg", "/products/iphone-17-air-space-black.jpg", "/products/iphone-17-air-esim.jpg"]), stockQuantity: 15 },
          { colorName: "Sky Blue", colorHex: "#BAE6FD", storage: "1TB", price: 139900, mrp: 149900, imageUrl: "/products/iphone-17-air-sky.jpg", galleryImages: JSON.stringify(["/products/iphone-17-air-sky.jpg", "/products/iphone-17-air-cloud-white.jpg", "/products/iphone-17-air-profile.jpg", "/products/iphone-17-air-space-black.jpg", "/products/iphone-17-air-esim.jpg"]), stockQuantity: 8 },
          { colorName: "Space Black", colorHex: "#1E293B", storage: "256GB", price: 99900, mrp: 109900, imageUrl: "/products/iphone-17-air-space-black.jpg", galleryImages: JSON.stringify(["/products/iphone-17-air-space-black.jpg", "/products/iphone-17-air-cloud-white.jpg", "/products/iphone-17-air-profile.jpg", "/products/iphone-17-air-sky.jpg", "/products/iphone-17-air-esim.jpg"]), stockQuantity: 25 },
          { colorName: "Space Black", colorHex: "#1E293B", storage: "512GB", price: 119900, mrp: 129900, imageUrl: "/products/iphone-17-air-space-black.jpg", galleryImages: JSON.stringify(["/products/iphone-17-air-space-black.jpg", "/products/iphone-17-air-cloud-white.jpg", "/products/iphone-17-air-profile.jpg", "/products/iphone-17-air-sky.jpg", "/products/iphone-17-air-esim.jpg"]), stockQuantity: 15 },
          { colorName: "Space Black", colorHex: "#1E293B", storage: "1TB", price: 139900, mrp: 149900, imageUrl: "/products/iphone-17-air-space-black.jpg", galleryImages: JSON.stringify(["/products/iphone-17-air-space-black.jpg", "/products/iphone-17-air-cloud-white.jpg", "/products/iphone-17-air-profile.jpg", "/products/iphone-17-air-sky.jpg", "/products/iphone-17-air-esim.jpg"]), stockQuantity: 8 },
        ],
      },
      emiPlans: {
        create: [
          { tenureMonths: 6, monthlyAmount: 16650, interestRate: 0.0, cashbackAmount: 5000, isZeroInterest: true, minMfPledge: 150000 },
          { tenureMonths: 12, monthlyAmount: 8325, interestRate: 0.0, cashbackAmount: 5000, isZeroInterest: true, minMfPledge: 150000 },
          { tenureMonths: 24, monthlyAmount: 4163, interestRate: 0.0, cashbackAmount: 5000, isZeroInterest: true, minMfPledge: 150000 },
        ],
      },
    },
  });

  // 4. Apple iPhone 17e
  await prisma.product.create({
    data: {
      slug: "iphone-17e",
      name: "Apple iPhone 17e",
      brand: "Apple",
      category: "mobiles",
      description: "Affordable flagship performance with single 48MP camera, A18 3nm chip, OLED display, and Apple Intelligence.",
      badge: "BEST VALUE",
      rating: 4.7,
      reviewCount: 980,
      variants: {
        create: [
          { colorName: "Blush Pink", colorHex: "#FBCFE8", storage: "128GB", price: 54900, mrp: 59900, imageUrl: "/products/iphone-17e-pink.jpg", galleryImages: JSON.stringify(["/products/iphone-17e-pink.jpg", "/products/iphone-17e-display.jpg", "/products/iphone-17e-magsafe.jpg", "/products/iphone-17e-black.jpg", "/products/iphone-17e-white.jpg"]), stockQuantity: 40, isDefault: true },
          { colorName: "Blush Pink", colorHex: "#FBCFE8", storage: "256GB", price: 64900, mrp: 69900, imageUrl: "/products/iphone-17e-pink.jpg", galleryImages: JSON.stringify(["/products/iphone-17e-pink.jpg", "/products/iphone-17e-display.jpg", "/products/iphone-17e-magsafe.jpg", "/products/iphone-17e-black.jpg", "/products/iphone-17e-white.jpg"]), stockQuantity: 25 },
          { colorName: "Blush Pink", colorHex: "#FBCFE8", storage: "512GB", price: 79900, mrp: 84900, imageUrl: "/products/iphone-17e-pink.jpg", galleryImages: JSON.stringify(["/products/iphone-17e-pink.jpg", "/products/iphone-17e-display.jpg", "/products/iphone-17e-magsafe.jpg", "/products/iphone-17e-black.jpg", "/products/iphone-17e-white.jpg"]), stockQuantity: 15 },
          { colorName: "Midnight Black", colorHex: "#1F2937", storage: "128GB", price: 54900, mrp: 59900, imageUrl: "/products/iphone-17e-black.jpg", galleryImages: JSON.stringify(["/products/iphone-17e-black.jpg", "/products/iphone-17e-display.jpg", "/products/iphone-17e-magsafe.jpg", "/products/iphone-17e-pink.jpg", "/products/iphone-17e-white.jpg"]), stockQuantity: 30 },
          { colorName: "Midnight Black", colorHex: "#1F2937", storage: "256GB", price: 64900, mrp: 69900, imageUrl: "/products/iphone-17e-black.jpg", galleryImages: JSON.stringify(["/products/iphone-17e-black.jpg", "/products/iphone-17e-display.jpg", "/products/iphone-17e-magsafe.jpg", "/products/iphone-17e-pink.jpg", "/products/iphone-17e-white.jpg"]), stockQuantity: 20 },
          { colorName: "Midnight Black", colorHex: "#1F2937", storage: "512GB", price: 79900, mrp: 84900, imageUrl: "/products/iphone-17e-black.jpg", galleryImages: JSON.stringify(["/products/iphone-17e-black.jpg", "/products/iphone-17e-display.jpg", "/products/iphone-17e-magsafe.jpg", "/products/iphone-17e-pink.jpg", "/products/iphone-17e-white.jpg"]), stockQuantity: 12 },
          { colorName: "Starlight White", colorHex: "#F8FAFC", storage: "128GB", price: 54900, mrp: 59900, imageUrl: "/products/iphone-17e-white.jpg", galleryImages: JSON.stringify(["/products/iphone-17e-white.jpg", "/products/iphone-17e-display.jpg", "/products/iphone-17e-magsafe.jpg", "/products/iphone-17e-pink.jpg", "/products/iphone-17e-black.jpg"]), stockQuantity: 30 },
          { colorName: "Starlight White", colorHex: "#F8FAFC", storage: "256GB", price: 64900, mrp: 69900, imageUrl: "/products/iphone-17e-white.jpg", galleryImages: JSON.stringify(["/products/iphone-17e-white.jpg", "/products/iphone-17e-display.jpg", "/products/iphone-17e-magsafe.jpg", "/products/iphone-17e-pink.jpg", "/products/iphone-17e-black.jpg"]), stockQuantity: 20 },
          { colorName: "Starlight White", colorHex: "#F8FAFC", storage: "512GB", price: 79900, mrp: 84900, imageUrl: "/products/iphone-17e-white.jpg", galleryImages: JSON.stringify(["/products/iphone-17e-white.jpg", "/products/iphone-17e-display.jpg", "/products/iphone-17e-magsafe.jpg", "/products/iphone-17e-pink.jpg", "/products/iphone-17e-black.jpg"]), stockQuantity: 10 },
        ],
      },
      emiPlans: {
        create: [
          { tenureMonths: 6, monthlyAmount: 9150, interestRate: 0.0, cashbackAmount: 3000, isZeroInterest: true, minMfPledge: 82500 },
          { tenureMonths: 12, monthlyAmount: 4575, interestRate: 0.0, cashbackAmount: 3000, isZeroInterest: true, minMfPledge: 82500 },
        ],
      },
    },
  });

  // 5. Apple iPhone 16 Pro
  await prisma.product.create({
    data: {
      slug: "iphone-16-pro",
      name: "Apple iPhone 16 Pro",
      brand: "Apple",
      category: "mobiles",
      description: "Grade 5 titanium design with Camera Control, 48MP Fusion camera, and A18 Pro chip.",
      badge: "POPULAR",
      rating: 4.8,
      reviewCount: 1950,
      variants: {
        create: [
          { colorName: "Black Titanium", colorHex: "#2E2C2D", storage: "128GB", price: 109900, mrp: 119900, imageUrl: "/products/iphone-16-pro-black.jpg", galleryImages: JSON.stringify(["/products/iphone-16-pro-black.jpg", "/products/iphone-16-pro.jpg", "/products/iphone-17-pro-silver.jpg"]), stockQuantity: 30, isDefault: true },
          { colorName: "Black Titanium", colorHex: "#2E2C2D", storage: "256GB", price: 119900, mrp: 129900, imageUrl: "/products/iphone-16-pro-black.jpg", galleryImages: JSON.stringify(["/products/iphone-16-pro-black.jpg", "/products/iphone-16-pro.jpg", "/products/iphone-17-pro-silver.jpg"]), stockQuantity: 25 },
          { colorName: "Black Titanium", colorHex: "#2E2C2D", storage: "512GB", price: 139900, mrp: 149900, imageUrl: "/products/iphone-16-pro-black.jpg", galleryImages: JSON.stringify(["/products/iphone-16-pro-black.jpg", "/products/iphone-16-pro.jpg", "/products/iphone-17-pro-silver.jpg"]), stockQuantity: 15 },
          { colorName: "Natural Titanium", colorHex: "#94A3B8", storage: "128GB", price: 109900, mrp: 119900, imageUrl: "/products/iphone-16-pro.jpg", galleryImages: JSON.stringify(["/products/iphone-16-pro.jpg", "/products/iphone-16-pro-black.jpg", "/products/iphone-17-pro-silver.jpg"]), stockQuantity: 25 },
          { colorName: "Natural Titanium", colorHex: "#94A3B8", storage: "256GB", price: 119900, mrp: 129900, imageUrl: "/products/iphone-16-pro.jpg", galleryImages: JSON.stringify(["/products/iphone-16-pro.jpg", "/products/iphone-16-pro-black.jpg", "/products/iphone-17-pro-silver.jpg"]), stockQuantity: 20 },
          { colorName: "Natural Titanium", colorHex: "#94A3B8", storage: "512GB", price: 139900, mrp: 149900, imageUrl: "/products/iphone-16-pro.jpg", galleryImages: JSON.stringify(["/products/iphone-16-pro.jpg", "/products/iphone-16-pro-black.jpg", "/products/iphone-17-pro-silver.jpg"]), stockQuantity: 10 },
          { colorName: "White Titanium", colorHex: "#F8FAFC", storage: "128GB", price: 109900, mrp: 119900, imageUrl: "/products/iphone-17-pro-silver.jpg", galleryImages: JSON.stringify(["/products/iphone-17-pro-silver.jpg", "/products/iphone-16-pro.jpg", "/products/iphone-16-pro-black.jpg"]), stockQuantity: 20 },
          { colorName: "White Titanium", colorHex: "#F8FAFC", storage: "256GB", price: 119900, mrp: 129900, imageUrl: "/products/iphone-17-pro-silver.jpg", galleryImages: JSON.stringify(["/products/iphone-17-pro-silver.jpg", "/products/iphone-16-pro.jpg", "/products/iphone-16-pro-black.jpg"]), stockQuantity: 15 },
          { colorName: "White Titanium", colorHex: "#F8FAFC", storage: "512GB", price: 139900, mrp: 149900, imageUrl: "/products/iphone-17-pro-silver.jpg", galleryImages: JSON.stringify(["/products/iphone-17-pro-silver.jpg", "/products/iphone-16-pro.jpg", "/products/iphone-16-pro-black.jpg"]), stockQuantity: 8 },
        ],
      },
      emiPlans: {
        create: [
          { tenureMonths: 6, monthlyAmount: 18316, interestRate: 0.0, cashbackAmount: 6000, isZeroInterest: true, minMfPledge: 165000 },
          { tenureMonths: 12, monthlyAmount: 9158, interestRate: 0.0, cashbackAmount: 6000, isZeroInterest: true, minMfPledge: 165000 },
        ],
      },
    },
  });

  // 6. Apple iPhone 16
  await prisma.product.create({
    data: {
      slug: "iphone-16",
      name: "Apple iPhone 16",
      brand: "Apple",
      category: "mobiles",
      description: "Camera Control, 48MP Fusion camera, Action button, and A18 chip in stunning vibrant colors with Apple Intelligence.",
      badge: "HOT DEAL",
      rating: 4.8,
      reviewCount: 2100,
      variants: {
        create: [
          { colorName: "Ultramarine", colorHex: "#4338CA", storage: "128GB", price: 69900, mrp: 79900, imageUrl: "/products/iphone-16-ultramarine.jpg", galleryImages: JSON.stringify(["/products/iphone-16-ultramarine.jpg", "/products/iphone-16-lineup.jpg", "/products/iphone-16-black.jpg", "/products/iphone-16-teal.jpg", "/products/iphone-16-pink.jpg"]), stockQuantity: 40, isDefault: true },
          { colorName: "Ultramarine", colorHex: "#4338CA", storage: "256GB", price: 79900, mrp: 89900, imageUrl: "/products/iphone-16-ultramarine.jpg", galleryImages: JSON.stringify(["/products/iphone-16-ultramarine.jpg", "/products/iphone-16-lineup.jpg", "/products/iphone-16-black.jpg", "/products/iphone-16-teal.jpg", "/products/iphone-16-pink.jpg"]), stockQuantity: 25 },
          { colorName: "Ultramarine", colorHex: "#4338CA", storage: "512GB", price: 99900, mrp: 109900, imageUrl: "/products/iphone-16-ultramarine.jpg", galleryImages: JSON.stringify(["/products/iphone-16-ultramarine.jpg", "/products/iphone-16-lineup.jpg", "/products/iphone-16-black.jpg", "/products/iphone-16-teal.jpg", "/products/iphone-16-pink.jpg"]), stockQuantity: 15 },
          { colorName: "Black", colorHex: "#1F2937", storage: "128GB", price: 69900, mrp: 79900, imageUrl: "/products/iphone-16-black.jpg", galleryImages: JSON.stringify(["/products/iphone-16-black.jpg", "/products/iphone-16-lineup.jpg", "/products/iphone-16-ultramarine.jpg"]), stockQuantity: 30 },
          { colorName: "Black", colorHex: "#1F2937", storage: "256GB", price: 79900, mrp: 89900, imageUrl: "/products/iphone-16-black.jpg", galleryImages: JSON.stringify(["/products/iphone-16-black.jpg", "/products/iphone-16-lineup.jpg", "/products/iphone-16-ultramarine.jpg"]), stockQuantity: 20 },
          { colorName: "Black", colorHex: "#1F2937", storage: "512GB", price: 99900, mrp: 109900, imageUrl: "/products/iphone-16-black.jpg", galleryImages: JSON.stringify(["/products/iphone-16-black.jpg", "/products/iphone-16-lineup.jpg", "/products/iphone-16-ultramarine.jpg"]), stockQuantity: 10 },
          { colorName: "Teal", colorHex: "#0D9488", storage: "128GB", price: 69900, mrp: 79900, imageUrl: "/products/iphone-16-teal.jpg", galleryImages: JSON.stringify(["/products/iphone-16-teal.jpg", "/products/iphone-16-lineup.jpg", "/products/iphone-16-ultramarine.jpg"]), stockQuantity: 25 },
          { colorName: "Teal", colorHex: "#0D9488", storage: "256GB", price: 79900, mrp: 89900, imageUrl: "/products/iphone-16-teal.jpg", galleryImages: JSON.stringify(["/products/iphone-16-teal.jpg", "/products/iphone-16-lineup.jpg", "/products/iphone-16-ultramarine.jpg"]), stockQuantity: 18 },
          { colorName: "Teal", colorHex: "#0D9488", storage: "512GB", price: 99900, mrp: 109900, imageUrl: "/products/iphone-16-teal.jpg", galleryImages: JSON.stringify(["/products/iphone-16-teal.jpg", "/products/iphone-16-lineup.jpg", "/products/iphone-16-ultramarine.jpg"]), stockQuantity: 8 },
          { colorName: "Pink", colorHex: "#EC4899", storage: "128GB", price: 69900, mrp: 79900, imageUrl: "/products/iphone-16-pink.jpg", galleryImages: JSON.stringify(["/products/iphone-16-pink.jpg", "/products/iphone-16-lineup.jpg", "/products/iphone-16-ultramarine.jpg"]), stockQuantity: 25 },
          { colorName: "Pink", colorHex: "#EC4899", storage: "256GB", price: 79900, mrp: 89900, imageUrl: "/products/iphone-16-pink.jpg", galleryImages: JSON.stringify(["/products/iphone-16-pink.jpg", "/products/iphone-16-lineup.jpg", "/products/iphone-16-ultramarine.jpg"]), stockQuantity: 18 },
          { colorName: "Pink", colorHex: "#EC4899", storage: "512GB", price: 99900, mrp: 109900, imageUrl: "/products/iphone-16-pink.jpg", galleryImages: JSON.stringify(["/products/iphone-16-pink.jpg", "/products/iphone-16-lineup.jpg", "/products/iphone-16-ultramarine.jpg"]), stockQuantity: 8 },
        ],
      },
      emiPlans: {
        create: [
          { tenureMonths: 6, monthlyAmount: 11650, interestRate: 0.0, cashbackAmount: 4000, isZeroInterest: true, minMfPledge: 105000 },
          { tenureMonths: 12, monthlyAmount: 5825, interestRate: 0.0, cashbackAmount: 4000, isZeroInterest: true, minMfPledge: 105000 },
        ],
      },
    },
  });

  // 7. Samsung Galaxy S24 Ultra
  await prisma.product.create({
    data: {
      slug: "samsung-s24-ultra",
      name: "Samsung Galaxy S24 Ultra",
      brand: "Samsung",
      category: "mobiles",
      description: "Galaxy AI powered flagship with Snapdragon 8 Gen 3 for Galaxy, titanium frame, built-in S Pen, and 200MP Quad Telephoto camera.",
      badge: "HOT DEAL",
      rating: 4.8,
      reviewCount: 1890,
      variants: {
        create: [
          { colorName: "Titanium Gray", colorHex: "#73757A", storage: "256GB", price: 121999, mrp: 134999, imageUrl: "/products/samsung-s24-ultra-gray.jpg", galleryImages: JSON.stringify(["/products/samsung-s24-ultra-gray.jpg", "/products/samsung-s24-ultra-black.jpg", "/products/samsung-s24-ultra-violet.jpg"]), stockQuantity: 30, isDefault: true },
          { colorName: "Titanium Gray", colorHex: "#73757A", storage: "512GB", price: 131999, mrp: 144999, imageUrl: "/products/samsung-s24-ultra-gray.jpg", galleryImages: JSON.stringify(["/products/samsung-s24-ultra-gray.jpg", "/products/samsung-s24-ultra-black.jpg", "/products/samsung-s24-ultra-violet.jpg"]), stockQuantity: 20 },
          { colorName: "Titanium Gray", colorHex: "#73757A", storage: "1TB", price: 151999, mrp: 164999, imageUrl: "/products/samsung-s24-ultra-gray.jpg", galleryImages: JSON.stringify(["/products/samsung-s24-ultra-gray.jpg", "/products/samsung-s24-ultra-black.jpg", "/products/samsung-s24-ultra-violet.jpg"]), stockQuantity: 12 },
          { colorName: "Titanium Black", colorHex: "#27272A", storage: "256GB", price: 121999, mrp: 134999, imageUrl: "/products/samsung-s24-ultra-black.jpg", galleryImages: JSON.stringify(["/products/samsung-s24-ultra-black.jpg", "/products/samsung-s24-ultra-gray.jpg", "/products/samsung-s24-ultra-violet.jpg"]), stockQuantity: 25 },
          { colorName: "Titanium Black", colorHex: "#27272A", storage: "512GB", price: 131999, mrp: 144999, imageUrl: "/products/samsung-s24-ultra-black.jpg", galleryImages: JSON.stringify(["/products/samsung-s24-ultra-black.jpg", "/products/samsung-s24-ultra-gray.jpg", "/products/samsung-s24-ultra-violet.jpg"]), stockQuantity: 18 },
          { colorName: "Titanium Black", colorHex: "#27272A", storage: "1TB", price: 151999, mrp: 164999, imageUrl: "/products/samsung-s24-ultra-black.jpg", galleryImages: JSON.stringify(["/products/samsung-s24-ultra-black.jpg", "/products/samsung-s24-ultra-gray.jpg", "/products/samsung-s24-ultra-violet.jpg"]), stockQuantity: 10 },
          { colorName: "Titanium Violet", colorHex: "#4C1D95", storage: "256GB", price: 121999, mrp: 134999, imageUrl: "/products/samsung-s24-ultra-violet.jpg", galleryImages: JSON.stringify(["/products/samsung-s24-ultra-violet.jpg", "/products/samsung-s24-ultra-gray.jpg", "/products/samsung-s24-ultra-black.jpg"]), stockQuantity: 20 },
          { colorName: "Titanium Violet", colorHex: "#4C1D95", storage: "512GB", price: 131999, mrp: 144999, imageUrl: "/products/samsung-s24-ultra-violet.jpg", galleryImages: JSON.stringify(["/products/samsung-s24-ultra-violet.jpg", "/products/samsung-s24-ultra-gray.jpg", "/products/samsung-s24-ultra-black.jpg"]), stockQuantity: 15 },
          { colorName: "Titanium Violet", colorHex: "#4C1D95", storage: "1TB", price: 151999, mrp: 164999, imageUrl: "/products/samsung-s24-ultra-violet.jpg", galleryImages: JSON.stringify(["/products/samsung-s24-ultra-violet.jpg", "/products/samsung-s24-ultra-gray.jpg", "/products/samsung-s24-ultra-black.jpg"]), stockQuantity: 8 },
        ],
      },
      emiPlans: {
        create: [
          { tenureMonths: 6, monthlyAmount: 20333, interestRate: 0.0, cashbackAmount: 6000, isZeroInterest: true, minMfPledge: 180000 },
          { tenureMonths: 12, monthlyAmount: 10166, interestRate: 0.0, cashbackAmount: 6000, isZeroInterest: true, minMfPledge: 180000 },
          { tenureMonths: 24, monthlyAmount: 5083, interestRate: 0.0, cashbackAmount: 6000, isZeroInterest: true, minMfPledge: 180000 },
        ],
      },
    },
  });

  // 8. Google Pixel 9 Pro
  await prisma.product.create({
    data: {
      slug: "google-pixel-9-pro",
      name: "Google Pixel 9 Pro",
      brand: "Google",
      category: "mobiles",
      description: "Engineered by Google with Gemini Nano, pro triple rear camera visor system, Super Actua display, and 24-hour battery life.",
      badge: "POPULAR",
      rating: 4.7,
      reviewCount: 940,
      variants: {
        create: [
          { colorName: "Obsidian", colorHex: "#25282A", storage: "128GB", price: 99999, mrp: 109999, imageUrl: "/products/google-pixel-9-pro-black.jpg", galleryImages: JSON.stringify(["/products/google-pixel-9-pro-black.jpg", "/products/google-pixel-9-pro-white.jpg", "/products/google-pixel-9-pro-hazel.jpg"]), stockQuantity: 28, isDefault: true },
          { colorName: "Obsidian", colorHex: "#25282A", storage: "256GB", price: 109999, mrp: 119999, imageUrl: "/products/google-pixel-9-pro-black.jpg", galleryImages: JSON.stringify(["/products/google-pixel-9-pro-black.jpg", "/products/google-pixel-9-pro-white.jpg", "/products/google-pixel-9-pro-hazel.jpg"]), stockQuantity: 18 },
          { colorName: "Obsidian", colorHex: "#25282A", storage: "512GB", price: 129999, mrp: 139999, imageUrl: "/products/google-pixel-9-pro-black.jpg", galleryImages: JSON.stringify(["/products/google-pixel-9-pro-black.jpg", "/products/google-pixel-9-pro-white.jpg", "/products/google-pixel-9-pro-hazel.jpg"]), stockQuantity: 12 },
          { colorName: "Porcelain", colorHex: "#F1F5F9", storage: "128GB", price: 99999, mrp: 109999, imageUrl: "/products/google-pixel-9-pro-white.jpg", galleryImages: JSON.stringify(["/products/google-pixel-9-pro-white.jpg", "/products/google-pixel-9-pro-black.jpg", "/products/google-pixel-9-pro-hazel.jpg"]), stockQuantity: 24 },
          { colorName: "Porcelain", colorHex: "#F1F5F9", storage: "256GB", price: 109999, mrp: 119999, imageUrl: "/products/google-pixel-9-pro-white.jpg", galleryImages: JSON.stringify(["/products/google-pixel-9-pro-white.jpg", "/products/google-pixel-9-pro-black.jpg", "/products/google-pixel-9-pro-hazel.jpg"]), stockQuantity: 16 },
          { colorName: "Porcelain", colorHex: "#F1F5F9", storage: "512GB", price: 129999, mrp: 139999, imageUrl: "/products/google-pixel-9-pro-white.jpg", galleryImages: JSON.stringify(["/products/google-pixel-9-pro-white.jpg", "/products/google-pixel-9-pro-black.jpg", "/products/google-pixel-9-pro-hazel.jpg"]), stockQuantity: 10 },
          { colorName: "Hazel", colorHex: "#78716C", storage: "128GB", price: 99999, mrp: 109999, imageUrl: "/products/google-pixel-9-pro-hazel.jpg", galleryImages: JSON.stringify(["/products/google-pixel-9-pro-hazel.jpg", "/products/google-pixel-9-pro-black.jpg", "/products/google-pixel-9-pro-white.jpg"]), stockQuantity: 20 },
          { colorName: "Hazel", colorHex: "#78716C", storage: "256GB", price: 109999, mrp: 119999, imageUrl: "/products/google-pixel-9-pro-hazel.jpg", galleryImages: JSON.stringify(["/products/google-pixel-9-pro-hazel.jpg", "/products/google-pixel-9-pro-black.jpg", "/products/google-pixel-9-pro-white.jpg"]), stockQuantity: 14 },
          { colorName: "Hazel", colorHex: "#78716C", storage: "512GB", price: 129999, mrp: 139999, imageUrl: "/products/google-pixel-9-pro-hazel.jpg", galleryImages: JSON.stringify(["/products/google-pixel-9-pro-hazel.jpg", "/products/google-pixel-9-pro-black.jpg", "/products/google-pixel-9-pro-white.jpg"]), stockQuantity: 8 },
        ],
      },
      emiPlans: {
        create: [
          { tenureMonths: 6, monthlyAmount: 16666, interestRate: 0.0, cashbackAmount: 5000, isZeroInterest: true, minMfPledge: 150000 },
          { tenureMonths: 12, monthlyAmount: 8333, interestRate: 0.0, cashbackAmount: 5000, isZeroInterest: true, minMfPledge: 150000 },
        ],
      },
    },
  });

  // 9. Apple iPad Pro 11-inch M4 OLED (Tablets Subcategory)
  await prisma.product.create({
    data: {
      slug: "ipad-pro-m4",
      name: "Apple iPad Pro 11-inch M4 OLED",
      brand: "Apple",
      category: "mobiles",
      description: "Ultra Retina XDR OLED display, breakthrough Apple M4 chip, ultra-thin 5.3mm design, and Apple Pencil Pro support.",
      badge: "NEW M4",
      rating: 4.9,
      reviewCount: 780,
      variants: {
        create: [
          { colorName: "Space Black", colorHex: "#2E2C2D", storage: "256GB Wi-Fi", price: 99900, mrp: 99900, imageUrl: "/products/ipad-pro-m4.jpg", galleryImages: JSON.stringify(["/products/ipad-pro-m4.jpg"]), stockQuantity: 25, isDefault: true },
          { colorName: "Space Black", colorHex: "#2E2C2D", storage: "512GB Wi-Fi", price: 119900, mrp: 119900, imageUrl: "/products/ipad-pro-m4.jpg", galleryImages: JSON.stringify(["/products/ipad-pro-m4.jpg"]), stockQuantity: 18 },
          { colorName: "Space Black", colorHex: "#2E2C2D", storage: "1TB Cellular", price: 159900, mrp: 169900, imageUrl: "/products/ipad-pro-m4.jpg", galleryImages: JSON.stringify(["/products/ipad-pro-m4.jpg"]), stockQuantity: 10 },
          { colorName: "Silver", colorHex: "#E2E8F0", storage: "256GB Wi-Fi", price: 99900, mrp: 99900, imageUrl: "/products/ipad-pro-m4.jpg", galleryImages: JSON.stringify(["/products/ipad-pro-m4.jpg"]), stockQuantity: 20 },
          { colorName: "Silver", colorHex: "#E2E8F0", storage: "512GB Wi-Fi", price: 119900, mrp: 119900, imageUrl: "/products/ipad-pro-m4.jpg", galleryImages: JSON.stringify(["/products/ipad-pro-m4.jpg"]), stockQuantity: 14 },
          { colorName: "Silver", colorHex: "#E2E8F0", storage: "1TB Cellular", price: 159900, mrp: 169900, imageUrl: "/products/ipad-pro-m4.jpg", galleryImages: JSON.stringify(["/products/ipad-pro-m4.jpg"]), stockQuantity: 8 },
        ],
      },
      emiPlans: {
        create: [
          { tenureMonths: 6, monthlyAmount: 16650, interestRate: 0.0, cashbackAmount: 5000, isZeroInterest: true, minMfPledge: 150000 },
          { tenureMonths: 12, monthlyAmount: 8325, interestRate: 0.0, cashbackAmount: 5000, isZeroInterest: true, minMfPledge: 150000 },
        ],
      },
    },
  });

  // 10. Samsung Galaxy Z Fold 6 (Foldable Subcategory)
  await prisma.product.create({
    data: {
      slug: "samsung-z-fold-6",
      name: "Samsung Galaxy Z Fold 6 AI",
      brand: "Samsung",
      category: "mobiles",
      description: "Dual Dynamic AMOLED 2X displays, Snapdragon 8 Gen 3 for Galaxy, IP48 water resistance, and slim lightweight foldable body.",
      badge: "FOLDABLE",
      rating: 4.8,
      reviewCount: 620,
      variants: {
        create: [
          { colorName: "Silver Shadow", colorHex: "#94A3B8", storage: "256GB", price: 164999, mrp: 174999, imageUrl: "/products/samsung-z-fold-6.jpg", galleryImages: JSON.stringify(["/products/samsung-z-fold-6.jpg"]), stockQuantity: 15, isDefault: true },
          { colorName: "Silver Shadow", colorHex: "#94A3B8", storage: "512GB", price: 176999, mrp: 186999, imageUrl: "/products/samsung-z-fold-6.jpg", galleryImages: JSON.stringify(["/products/samsung-z-fold-6.jpg"]), stockQuantity: 10 },
          { colorName: "Silver Shadow", colorHex: "#94A3B8", storage: "1TB", price: 196999, mrp: 206999, imageUrl: "/products/samsung-z-fold-6.jpg", galleryImages: JSON.stringify(["/products/samsung-z-fold-6.jpg"]), stockQuantity: 6 },
          { colorName: "Navy Blue", colorHex: "#1E3A8A", storage: "256GB", price: 164999, mrp: 174999, imageUrl: "/products/samsung-z-fold-6.jpg", galleryImages: JSON.stringify(["/products/samsung-z-fold-6.jpg"]), stockQuantity: 12 },
          { colorName: "Navy Blue", colorHex: "#1E3A8A", storage: "512GB", price: 176999, mrp: 186999, imageUrl: "/products/samsung-z-fold-6.jpg", galleryImages: JSON.stringify(["/products/samsung-z-fold-6.jpg"]), stockQuantity: 8 },
          { colorName: "Navy Blue", colorHex: "#1E3A8A", storage: "1TB", price: 196999, mrp: 206999, imageUrl: "/products/samsung-z-fold-6.jpg", galleryImages: JSON.stringify(["/products/samsung-z-fold-6.jpg"]), stockQuantity: 5 },
          { colorName: "Phantom Black", colorHex: "#18181B", storage: "256GB", price: 164999, mrp: 174999, imageUrl: "/products/samsung-z-fold-6.jpg", galleryImages: JSON.stringify(["/products/samsung-z-fold-6.jpg"]), stockQuantity: 10 },
          { colorName: "Phantom Black", colorHex: "#18181B", storage: "512GB", price: 176999, mrp: 186999, imageUrl: "/products/samsung-z-fold-6.jpg", galleryImages: JSON.stringify(["/products/samsung-z-fold-6.jpg"]), stockQuantity: 8 },
          { colorName: "Phantom Black", colorHex: "#18181B", storage: "1TB", price: 196999, mrp: 206999, imageUrl: "/products/samsung-z-fold-6.jpg", galleryImages: JSON.stringify(["/products/samsung-z-fold-6.jpg"]), stockQuantity: 4 },
        ],
      },
      emiPlans: {
        create: [
          { tenureMonths: 6, monthlyAmount: 27499, interestRate: 0.0, cashbackAmount: 8000, isZeroInterest: true, minMfPledge: 250000 },
          { tenureMonths: 12, monthlyAmount: 13749, interestRate: 0.0, cashbackAmount: 8000, isZeroInterest: true, minMfPledge: 250000 },
        ],
      },
    },
  });

  // 11. Apple MagSafe Duo Fast Charger (Mobile Accessories)
  await prisma.product.create({
    data: {
      slug: "magsafe-duo-charger",
      name: "Apple MagSafe Duo Wireless Charger",
      brand: "Apple",
      category: "mobiles",
      description: "Conveniently charges your compatible iPhone, Apple Watch, and AirPods Wireless Charging Case simultaneously.",
      badge: "ACCESSORY",
      rating: 4.8,
      reviewCount: 1450,
      variants: {
        create: [
          { colorName: "Pure White", colorHex: "#F8FAFC", storage: "Standard Pack", price: 13900, mrp: 14900, imageUrl: "/products/magsafe-duo-charger.jpg", galleryImages: JSON.stringify(["/products/magsafe-duo-charger.jpg"]), stockQuantity: 50, isDefault: true },
          { colorName: "Pure White", colorHex: "#F8FAFC", storage: "Fast 35W Adapter Kit", price: 16900, mrp: 18900, imageUrl: "/products/magsafe-duo-charger.jpg", galleryImages: JSON.stringify(["/products/magsafe-duo-charger.jpg"]), stockQuantity: 30 },
          { colorName: "Pure White", colorHex: "#F8FAFC", storage: "Travel Leather Bundle", price: 19900, mrp: 21900, imageUrl: "/products/magsafe-duo-charger.jpg", galleryImages: JSON.stringify(["/products/magsafe-duo-charger.jpg"]), stockQuantity: 20 },
        ],
      },
      emiPlans: {
        create: [
          { tenureMonths: 6, monthlyAmount: 2316, interestRate: 0.0, cashbackAmount: 1000, isZeroInterest: true, minMfPledge: 21000 },
        ],
      },
    },
  });

  // 12. Belkin 3-in-1 MagSafe Wireless Stand (Stands & Mounts)
  await prisma.product.create({
    data: {
      slug: "belkin-3in1-stand",
      name: "Belkin BoostCharge Pro 3-in-1 MagSafe Stand",
      brand: "Belkin",
      category: "mobiles",
      description: "Ultra-convenient 15W MagSafe wireless charging stand for iPhone 17/16, Apple Watch fast charging, and AirPods tray.",
      badge: "PREMIUM DOCK",
      rating: 4.8,
      reviewCount: 720,
      variants: {
        create: [
          { colorName: "White", colorHex: "#F8FAFC", storage: "15W Stand", price: 14990, mrp: 16990, imageUrl: "/products/belkin-3in1-stand.jpg", galleryImages: JSON.stringify(["/products/belkin-3in1-stand.jpg"]), stockQuantity: 30, isDefault: true },
          { colorName: "Black", colorHex: "#18181B", storage: "15W Stand", price: 14990, mrp: 16990, imageUrl: "/products/belkin-3in1-stand.jpg", galleryImages: JSON.stringify(["/products/belkin-3in1-stand.jpg"]), stockQuantity: 25 },
        ],
      },
      emiPlans: {
        create: [
          { tenureMonths: 6, monthlyAmount: 2498, interestRate: 0.0, cashbackAmount: 1000, isZeroInterest: true, minMfPledge: 22500 },
        ],
      },
    },
  });

  // 13. Spigen Ultra Hybrid Armor Case (Cases & Screen Protectors)
  await prisma.product.create({
    data: {
      slug: "spigen-armor-case",
      name: "Spigen Ultra Hybrid MagSafe Armor Case",
      brand: "Spigen",
      category: "mobiles",
      description: "Crystal clear transparency with built-in magnetic ring, military grade drop protection, and anti-yellowing resin.",
      badge: "MILITARY GRADE",
      rating: 4.9,
      reviewCount: 2200,
      variants: {
        create: [
          { colorName: "Crystal Clear", colorHex: "#E2E8F0", storage: "iPhone 17 Pro Case", price: 2999, mrp: 3999, imageUrl: "/products/spigen-armor-case.jpg", galleryImages: JSON.stringify(["/products/spigen-armor-case.jpg"]), stockQuantity: 80, isDefault: true },
          { colorName: "Matte Black", colorHex: "#18181B", storage: "iPhone 17 Pro Max Case", price: 3299, mrp: 4299, imageUrl: "/products/spigen-armor-case.jpg", galleryImages: JSON.stringify(["/products/spigen-armor-case.jpg"]), stockQuantity: 60 },
          { colorName: "Deep Blue", colorHex: "#1E3A8A", storage: "With Tempered Glass 2-Pack", price: 4499, mrp: 5999, imageUrl: "/products/spigen-armor-case.jpg", galleryImages: JSON.stringify(["/products/spigen-armor-case.jpg"]), stockQuantity: 40 },
        ],
      },
      emiPlans: {
        create: [
          { tenureMonths: 3, monthlyAmount: 999, interestRate: 0.0, cashbackAmount: 300, isZeroInterest: true, minMfPledge: 5000 },
        ],
      },
    },
  });

  // 14. Sony HT-A7000 7.1.2ch Dolby Atmos Soundbar (Speakers & Soundbars)
  await prisma.product.create({
    data: {
      slug: "sony-ht-a7000-soundbar",
      name: "Sony HT-A7000 7.1.2ch Dolby Atmos Soundbar",
      brand: "Sony",
      category: "electronics",
      description: "Flagship 500W premium soundbar with 360 Spatial Sound Mapping, Sound Field Optimization, and Hi-Res Audio.",
      badge: "DOLBY ATMOS",
      rating: 4.9,
      reviewCount: 450,
      variants: {
        create: [
          { colorName: "Midnight Black", colorHex: "#18181B", storage: "Standalone Bar (500W)", price: 89990, mrp: 109990, imageUrl: "/products/sony-ht-a7000-soundbar.jpg", galleryImages: JSON.stringify(["/products/sony-ht-a7000-soundbar.jpg"]), stockQuantity: 15, isDefault: true },
          { colorName: "Midnight Black", colorHex: "#18181B", storage: "With Wireless Subwoofer", price: 119990, mrp: 144990, imageUrl: "/products/sony-ht-a7000-soundbar.jpg", galleryImages: JSON.stringify(["/products/sony-ht-a7000-soundbar.jpg"]), stockQuantity: 10 },
          { colorName: "Midnight Black", colorHex: "#18181B", storage: "Complete 7.1.2 Cinema Kit", price: 149990, mrp: 179990, imageUrl: "/products/sony-ht-a7000-soundbar.jpg", galleryImages: JSON.stringify(["/products/sony-ht-a7000-soundbar.jpg"]), stockQuantity: 6 },
        ],
      },
      emiPlans: {
        create: [
          { tenureMonths: 6, monthlyAmount: 14998, interestRate: 0.0, cashbackAmount: 5000, isZeroInterest: true, minMfPledge: 135000 },
          { tenureMonths: 12, monthlyAmount: 7499, interestRate: 0.0, cashbackAmount: 5000, isZeroInterest: true, minMfPledge: 135000 },
        ],
      },
    },
  });

  // 15. Logitech MX Master 3S Wireless Mouse (Mouse)
  await prisma.product.create({
    data: {
      slug: "logitech-mx-bundle",
      name: "Logitech MX Master 3S Wireless Performance Mouse",
      brand: "Logitech",
      category: "electronics",
      description: "Quiet click 8K DPI any-surface laser sensor, MagSpeed electromagnetic scroll wheel, and ergonomic precision thumb rest.",
      badge: "PRO MOUSE",
      rating: 4.9,
      reviewCount: 1650,
      variants: {
        create: [
          { colorName: "Graphite Gray", colorHex: "#334155", storage: "Standard Edition", price: 9995, mrp: 11995, imageUrl: "/products/logitech-mx-bundle.jpg", galleryImages: JSON.stringify(["/products/logitech-mx-bundle.jpg"]), stockQuantity: 30, isDefault: true },
          { colorName: "Pale Grey", colorHex: "#E2E8F0", storage: "Standard Edition", price: 9995, mrp: 11995, imageUrl: "/products/logitech-mx-bundle.jpg", galleryImages: JSON.stringify(["/products/logitech-mx-bundle.jpg"]), stockQuantity: 20 },
        ],
      },
      emiPlans: {
        create: [
          { tenureMonths: 3, monthlyAmount: 3331, interestRate: 0.0, cashbackAmount: 500, isZeroInterest: true, minMfPledge: 15000 },
          { tenureMonths: 6, monthlyAmount: 1665, interestRate: 0.0, cashbackAmount: 500, isZeroInterest: true, minMfPledge: 15000 },
        ],
      },
    },
  });

  // 16. Apple MacBook Pro M3
  await prisma.product.create({
    data: {
      slug: "macbook-pro-m3",
      name: "Apple MacBook Pro 14-inch M3 Pro",
      brand: "Apple",
      category: "electronics",
      description: "Liquid Retina XDR display, M3 Pro chip with 12-core CPU and 18-core GPU, up to 18 hours battery life.",
      badge: "PRO PICK",
      rating: 4.9,
      reviewCount: 1120,
      variants: {
        create: [
          { colorName: "Space Black", colorHex: "#2B2C30", storage: "512GB SSD", price: 159900, mrp: 169900, imageUrl: "/products/macbook-pro-m3.jpg", galleryImages: macbookGallery, stockQuantity: 20, isDefault: true },
          { colorName: "Space Black", colorHex: "#2B2C30", storage: "1TB SSD", price: 179900, mrp: 189900, imageUrl: "/products/macbook-pro-m3.jpg", galleryImages: macbookGallery, stockQuantity: 15 },
          { colorName: "Space Black", colorHex: "#2B2C30", storage: "2TB SSD", price: 219900, mrp: 229900, imageUrl: "/products/macbook-pro-m3.jpg", galleryImages: macbookGallery, stockQuantity: 8 },
          { colorName: "Silver", colorHex: "#E2E8F0", storage: "512GB SSD", price: 159900, mrp: 169900, imageUrl: "/products/macbook-pro-m3.jpg", galleryImages: macbookGallery, stockQuantity: 18 },
          { colorName: "Silver", colorHex: "#E2E8F0", storage: "1TB SSD", price: 179900, mrp: 189900, imageUrl: "/products/macbook-pro-m3.jpg", galleryImages: macbookGallery, stockQuantity: 12 },
          { colorName: "Silver", colorHex: "#E2E8F0", storage: "2TB SSD", price: 219900, mrp: 229900, imageUrl: "/products/macbook-pro-m3.jpg", galleryImages: macbookGallery, stockQuantity: 6 },
        ],
      },
      emiPlans: {
        create: [
          { tenureMonths: 6, monthlyAmount: 26650, interestRate: 0.0, cashbackAmount: 8000, isZeroInterest: true, minMfPledge: 240000 },
        ],
      },
    },
  });

  // 17. Apple Watch Ultra 2
  await prisma.product.create({
    data: {
      slug: "apple-watch-ultra-2",
      name: "Apple Watch Ultra 2 Titanium",
      brand: "Apple",
      category: "electronics",
      description: "Rugged 49mm titanium case, 3000 nits display, precision dual-frequency GPS, and up to 72 hours battery life.",
      badge: "PRO FITNESS",
      rating: 4.9,
      reviewCount: 820,
      variants: {
        create: [
          { colorName: "Orange Ocean", colorHex: "#EA580C", storage: "49mm GPS", price: 89900, mrp: 89900, imageUrl: "/products/apple-watch-ultra-2.jpg", galleryImages: watchGallery, stockQuantity: 20, isDefault: true },
          { colorName: "Orange Ocean", colorHex: "#EA580C", storage: "49mm Cellular", price: 94900, mrp: 99900, imageUrl: "/products/apple-watch-ultra-2.jpg", galleryImages: watchGallery, stockQuantity: 15 },
          { colorName: "Blue Alpine", colorHex: "#2563EB", storage: "49mm GPS", price: 89900, mrp: 89900, imageUrl: "/products/apple-watch-ultra-2.jpg", galleryImages: watchGallery, stockQuantity: 18 },
          { colorName: "Trail Loop Black", colorHex: "#18181B", storage: "49mm GPS", price: 89900, mrp: 89900, imageUrl: "/products/apple-watch-ultra-2.jpg", galleryImages: watchGallery, stockQuantity: 16 },
        ],
      },
      emiPlans: {
        create: [
          { tenureMonths: 6, monthlyAmount: 14983, interestRate: 0.0, cashbackAmount: 4000, isZeroInterest: true, minMfPledge: 135000 },
          { tenureMonths: 12, monthlyAmount: 7491, interestRate: 0.0, cashbackAmount: 4000, isZeroInterest: true, minMfPledge: 135000 },
        ],
      },
    },
  });

  // 18. Sony WH-1000XM5
  await prisma.product.create({
    data: {
      slug: "sony-wh-1000xm5",
      name: "Sony WH-1000XM5 Wireless Headphones",
      brand: "Sony",
      category: "electronics",
      description: "Industry-leading noise canceling with Auto NC Optimizer, 30-hour battery life, and crystal-clear hands-free calling.",
      badge: "TOP AUDIO",
      rating: 4.8,
      reviewCount: 1640,
      variants: {
        create: [
          { colorName: "Platinum Silver", colorHex: "#E2E8F0", storage: "Standard Edition", price: 29990, mrp: 34990, imageUrl: "/products/sony-wh-1000xm5.jpg", galleryImages: sonyGallery, stockQuantity: 45, isDefault: true },
          { colorName: "Midnight Black", colorHex: "#18181B", storage: "Standard Edition", price: 29990, mrp: 34990, imageUrl: "/products/sony-wh-1000xm5.jpg", galleryImages: sonyGallery, stockQuantity: 40 },
          { colorName: "Smoky Pink", colorHex: "#FBCFE8", storage: "Standard Edition", price: 29990, mrp: 34990, imageUrl: "/products/sony-wh-1000xm5.jpg", galleryImages: sonyGallery, stockQuantity: 30 },
        ],
      },
      emiPlans: {
        create: [
          { tenureMonths: 6, monthlyAmount: 4998, interestRate: 0.0, cashbackAmount: 2000, isZeroInterest: true, minMfPledge: 45000 },
        ],
      },
    },
  });

  // 19. LG OLED TV
  await prisma.product.create({
    data: {
      slug: "lg-oled-c4",
      name: "LG 55-inch OLED evo C4 4K Smart TV",
      brand: "LG",
      category: "appliances",
      description: "Infinite contrast, 100% color fidelity, α9 AI Processor 4K Gen7, Dolby Vision and Dolby Atmos cinema experience.",
      badge: "4K CINEMA",
      rating: 4.9,
      reviewCount: 650,
      variants: {
        create: [
          { colorName: "Titan Black", colorHex: "#18181B", storage: "55-inch 4K OLED", price: 139990, mrp: 189990, imageUrl: "/products/lg-oled-c4.jpg", galleryImages: tvGallery, stockQuantity: 12, isDefault: true },
          { colorName: "Titan Black", colorHex: "#18181B", storage: "65-inch 4K OLED", price: 189990, mrp: 249990, imageUrl: "/products/lg-oled-c4.jpg", galleryImages: tvGallery, stockQuantity: 10 },
          { colorName: "Eclipse Silver", colorHex: "#94A3B8", storage: "55-inch 4K OLED", price: 139990, mrp: 189990, imageUrl: "/products/lg-oled-c4.jpg", galleryImages: tvGallery, stockQuantity: 10 },
        ],
      },
      emiPlans: {
        create: [
          { tenureMonths: 6, monthlyAmount: 23331, interestRate: 0.0, cashbackAmount: 7000, isZeroInterest: true, minMfPledge: 210000 },
        ],
      },
    },
  });

  // 20. Daikin 1.5 Ton 5 Star Inverter Split AC (Air Conditioners)
  await prisma.product.create({
    data: {
      slug: "daikin-1-5t-ac",
      name: "Daikin 1.5 Ton 5 Star Inverter Split AC",
      brand: "Daikin",
      category: "appliances",
      description: "Copper condenser, PM2.5 air purification filter, 3D airflow, and ultra-high cooling performance up to 54°C.",
      badge: "5 STAR ENERGY",
      rating: 4.8,
      reviewCount: 530,
      variants: {
        create: [
          { colorName: "Pure White", colorHex: "#F8FAFC", storage: "1.5 Ton 5-Star", price: 44990, mrp: 58990, imageUrl: "/products/daikin-1-5t-ac.jpg", galleryImages: JSON.stringify(["/products/daikin-1-5t-ac.jpg"]), stockQuantity: 20, isDefault: true },
          { colorName: "Pure White", colorHex: "#F8FAFC", storage: "With Free Standard Installation", price: 46490, mrp: 61990, imageUrl: "/products/daikin-1-5t-ac.jpg", galleryImages: JSON.stringify(["/products/daikin-1-5t-ac.jpg"]), stockQuantity: 15 },
          { colorName: "Titanium Silver", colorHex: "#94A3B8", storage: "1.5 Ton 5-Star", price: 45990, mrp: 59990, imageUrl: "/products/daikin-1-5t-ac.jpg", galleryImages: JSON.stringify(["/products/daikin-1-5t-ac.jpg"]), stockQuantity: 15 },
        ],
      },
      emiPlans: {
        create: [
          { tenureMonths: 6, monthlyAmount: 7498, interestRate: 0.0, cashbackAmount: 2500, isZeroInterest: true, minMfPledge: 67500 },
        ],
      },
    },
  });

  // 21. Samsung 580L French Door Smart Refrigerator (Refrigerators)
  await prisma.product.create({
    data: {
      slug: "samsung-french-door-fridge",
      name: "Samsung 580L French Door Smart Refrigerator",
      brand: "Samsung",
      category: "appliances",
      description: "Twin Cooling Plus, convertible multi-door zones, digital inverter with 20-year warranty, and Wi-Fi SmartThings control.",
      badge: "PREMIUM HOME",
      rating: 4.9,
      reviewCount: 380,
      variants: {
        create: [
          { colorName: "Refined Inox", colorHex: "#475569", storage: "580L Multi-Door", price: 79990, mrp: 99990, imageUrl: "/products/samsung-french-door-fridge.jpg", galleryImages: JSON.stringify(["/products/samsung-french-door-fridge.jpg"]), stockQuantity: 12, isDefault: true },
          { colorName: "Black Caviar", colorHex: "#18181B", storage: "580L Multi-Door", price: 84990, mrp: 104990, imageUrl: "/products/samsung-french-door-fridge.jpg", galleryImages: JSON.stringify(["/products/samsung-french-door-fridge.jpg"]), stockQuantity: 8 },
        ],
      },
      emiPlans: {
        create: [
          { tenureMonths: 6, monthlyAmount: 13331, interestRate: 0.0, cashbackAmount: 4000, isZeroInterest: true, minMfPledge: 120000 },
        ],
      },
    },
  });

  // 22. Bosch 8kg Front Load Smart Washer (Washing Machines)
  await prisma.product.create({
    data: {
      slug: "bosch-front-load-washer",
      name: "Bosch 8kg 5 Star Front Load Inverter Washer",
      brand: "Bosch",
      category: "appliances",
      description: "EcoSilence Drive motor, 1400 RPM spin, Anti-Stain technology, and allergy plus steam hygiene protection.",
      badge: "GERMAN QUALITY",
      rating: 4.8,
      reviewCount: 910,
      variants: {
        create: [
          { colorName: "Silver Metallic", colorHex: "#94A3B8", storage: "8kg Inverter 1400RPM", price: 38990, mrp: 51990, imageUrl: "/products/bosch-front-load-washer.jpg", galleryImages: JSON.stringify(["/products/bosch-front-load-washer.jpg"]), stockQuantity: 18, isDefault: true },
          { colorName: "Glacier White", colorHex: "#F8FAFC", storage: "8kg Inverter 1400RPM", price: 38990, mrp: 51990, imageUrl: "/products/bosch-front-load-washer.jpg", galleryImages: JSON.stringify(["/products/bosch-front-load-washer.jpg"]), stockQuantity: 15 },
        ],
      },
      emiPlans: {
        create: [
          { tenureMonths: 6, monthlyAmount: 6498, interestRate: 0.0, cashbackAmount: 2000, isZeroInterest: true, minMfPledge: 58500 },
        ],
      },
    },
  });

  // 23. Dyson V15 Detect Cordless Vacuum (Kitchen & Home)
  await prisma.product.create({
    data: {
      slug: "dyson-v15",
      name: "Dyson V15 Detect Cordless Vacuum",
      brand: "Dyson",
      category: "kitchen",
      description: "Laser reveals microscopic dust, piezo sensor measures dust particles, up to 60 minutes run time.",
      badge: "SMART CLEAN",
      rating: 4.8,
      reviewCount: 420,
      variants: {
        create: [
          { colorName: "Yellow / Nickel", colorHex: "#EAB308", storage: "Cordless Complete", price: 59900, mrp: 65900, imageUrl: "/products/dyson-v15.jpg", galleryImages: dysonGallery, stockQuantity: 18, isDefault: true },
          { colorName: "Prussian Blue", colorHex: "#1E3A8A", storage: "Cordless Complete", price: 59900, mrp: 65900, imageUrl: "/products/dyson-v15.jpg", galleryImages: dysonGallery, stockQuantity: 15 },
        ],
      },
      emiPlans: {
        create: [
          { tenureMonths: 6, monthlyAmount: 9983, interestRate: 0.0, cashbackAmount: 3000, isZeroInterest: true, minMfPledge: 90000 },
        ],
      },
    },
  });

  // 24. Philips 750W Juicer Mixer Grinder (Juicers & Grinders)
  await prisma.product.create({
    data: {
      slug: "philips-mixer-grinder",
      name: "Philips HL7707 750W 4-Jar Juicer Mixer Grinder",
      brand: "Philips",
      category: "kitchen",
      description: "PowerChop technology, leak-proof stainless steel jars, chefpro bowl, and compact motor with 5-year warranty.",
      badge: "BEST SELLER",
      rating: 4.7,
      reviewCount: 2800,
      variants: {
        create: [
          { colorName: "Bright White / Orange", colorHex: "#F97316", storage: "4-Jar Complete Set", price: 7499, mrp: 9995, imageUrl: "/products/philips-mixer-grinder.jpg", galleryImages: JSON.stringify(["/products/philips-mixer-grinder.jpg"]), stockQuantity: 40, isDefault: true },
          { colorName: "Metallic Silver", colorHex: "#94A3B8", storage: "4-Jar Complete Set", price: 7999, mrp: 10495, imageUrl: "/products/philips-mixer-grinder.jpg", galleryImages: JSON.stringify(["/products/philips-mixer-grinder.jpg"]), stockQuantity: 25 },
        ],
      },
      emiPlans: {
        create: [
          { tenureMonths: 3, monthlyAmount: 2499, interestRate: 0.0, cashbackAmount: 500, isZeroInterest: true, minMfPledge: 11250 },
        ],
      },
    },
  });

  // 25. De'Longhi Magnifica S Espresso Machine (Coffee Makers)
  await prisma.product.create({
    data: {
      slug: "delonghi-espresso-maker",
      name: "De'Longhi Magnifica S Bean-to-Cup Espresso Machine",
      brand: "De'Longhi",
      category: "kitchen",
      description: "Integrated steel burr grinder with 13 settings, manual milk frother cappuccino system, and customizable coffee aroma.",
      badge: "BARISTA CHOICE",
      rating: 4.9,
      reviewCount: 310,
      variants: {
        create: [
          { colorName: "Classic Black", colorHex: "#18181B", storage: "Standard Edition", price: 42990, mrp: 54990, imageUrl: "/products/delonghi-espresso-maker.jpg", galleryImages: JSON.stringify(["/products/delonghi-espresso-maker.jpg"]), stockQuantity: 15, isDefault: true },
          { colorName: "Silver Chrome", colorHex: "#94A3B8", storage: "Standard Edition", price: 44990, mrp: 56990, imageUrl: "/products/delonghi-espresso-maker.jpg", galleryImages: JSON.stringify(["/products/delonghi-espresso-maker.jpg"]), stockQuantity: 10 },
        ],
      },
      emiPlans: {
        create: [
          { tenureMonths: 6, monthlyAmount: 7165, interestRate: 0.0, cashbackAmount: 2500, isZeroInterest: true, minMfPledge: 64500 },
        ],
      },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
