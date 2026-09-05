# 1Fi - 0% Mutual Fund Backed EMI Platform

A clean, production-grade full-stack fintech web application built for the **1Fi SDE1 Internship Assignment**. The platform showcases tech products with dynamic, mutual fund-backed EMI plans where investments—not credit scores—power purchases.

---

## Tech Stack

- **Frontend**: React 18, Next.js 14 (App Router), Tailwind CSS, Lucide Icons
- **Backend**: Node.js, Next.js Server Handlers / REST API Routes
- **Database & ORM**: SQLite (default local) / PostgreSQL, Prisma ORM
- **Language**: TypeScript

---

## Key Features

- **Snapmint Reference Product Page**: Clean e-commerce layout with vertical multi-image thumbnails, main viewer, dynamic variant dropdowns, pricing, downpayment callouts, and seller info.
- **Dynamic Category Filtering**: Active filter bar for **All Products**, **Deals**, **Mobiles**, **Electronics**, **TV & Appliances**, and **Kitchen & Home**.
- **Model-Specific Photography**: 100% authentic photography for iPhone 17 Pro, iPhone 17 Pro Max, iPhone 17 Air, iPhone 17e, Samsung Galaxy S24 Ultra, Google Pixel 9 Pro, Apple Watch Ultra 2, and Sony WH-1000XM5.
- **Hardware Architecture & Exploded Teardown**: Dynamic hardware component breakdowns specific to each product model (A19 Pro 3nm chip for iPhone, Snapdragon 8 Gen 3 & S-Pen for Samsung Galaxy).
- **Mutual Fund EMI Plans**: Real-time calculated plans (3m, 6m, 9m, 12m, 24m @ 0% interest and 36m, 48m, 60m @ 10.5% with ₹7,500 cashback).
- **Proceed & Pledge Simulation**: Interactive modal to select mutual fund provider, enter folio/PAN, authorize digital lien via CAMS/KFintech, and complete order placement.
- **Production-Grade Security**: Sliding-window rate limiting, input sanitization, PAN & mobile number KYC validation, boundary-checked monetary calculations, and relational foreign-key integrity enforcement.

---

## Database Schema

```prisma
datasource db {
  provider = "sqlite" // Can be switched to "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Product {
  id          String           @id @default(cuid())
  slug        String           @unique
  name        String
  brand       String
  category    String
  description String
  badge       String?
  rating      Float            @default(4.9)
  reviewCount Int              @default(1250)
  variants    ProductVariant[]
  emiPlans    EmiPlan[]
  createdAt   DateTime         @default(now())
  updatedAt   DateTime         @updatedAt
}

model ProductVariant {
  id            String   @id @default(cuid())
  productId     String
  product       Product  @relation(fields: [productId], references: [id], onDelete: Cascade)
  colorName     String
  colorHex      String
  storage       String
  price         Int
  mrp           Int
  imageUrl      String
  galleryImages String   @default("[]")
  stockQuantity Int      @default(25)
  isDefault     Boolean  @default(false)
  createdAt     DateTime @default(now())
}

model EmiPlan {
  id             String   @id @default(cuid())
  productId      String
  product        Product  @relation(fields: [productId], references: [id], onDelete: Cascade)
  tenureMonths   Int
  monthlyAmount  Int
  interestRate   Float
  cashbackAmount Int
  isZeroInterest Boolean  @default(false)
  minMfPledge    Int
  createdAt      DateTime @default(now())
}
```

---

## Getting Started

### 1. Installation
```bash
# Clone the repository
git clone https://github.com/your-username/1fi-assignment.git
cd 1fi-assignment

# Install dependencies
npm install
```

### 2. Database Setup & Seeding
```bash
# Push schema to database
npx prisma db push

# Seed initial products, variants, and EMI tiers
npm run db:seed
```

### 3. Run the Application
```bash
# Start development server
npm run dev

# Or build and run production server
npm run build
npm run start
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## API Endpoints & Example Responses

### 1. List Products
- **Endpoint**: `GET /api/products`
- **Query Params**: `category` (optional), `search` (optional)

### 2. Get Single Product
- **Endpoint**: `GET /api/products/:slug` (e.g. `/api/products/iphone-17-pro`)

### 3. Dynamic EMI Calculation
- **Endpoint**: `GET /api/products/:slug/emi?price=147400`

### 4. Simulate Mutual Fund Pledge & Order
- **Endpoint**: `POST /api/orders/simulate`
- **Payload**:
```json
{
  "productId": "cmtk55vh70000135w7gg4s5qn",
  "variantId": "cmtk55vh80001135wepov4r5n",
  "emiPlanId": "cmtk55vh90008135wcr0z5y4s",
  "customerName": "Alex Sharma",
  "phone": "9876543210",
  "pan": "ABCDE1234F",
  "folioNumber": "FOLIO-98765432"
}
```

---

## Deployment Instructions

### Deploy to Vercel
1. Push your repository to GitHub.
2. Go to [Vercel](https://vercel.com) and import the repository.
3. For persistent PostgreSQL in production: create a free database on [Neon](https://neon.tech) or [Supabase](https://supabase.com), set `DATABASE_URL` in Vercel Environment Variables, and set the build command to `npm run build`.
4. Click **Deploy**.

---

