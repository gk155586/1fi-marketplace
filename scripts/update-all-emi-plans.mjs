import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function updateAllEmiPlans() {
  console.log("Updating EMI plans for all products in database...");

  const products = await prisma.product.findMany({
    include: {
      variants: true,
      emiPlans: true,
    },
  });

  for (const product of products) {
    const defaultVariant = product.variants.find((v) => v.isDefault) || product.variants[0] || { price: 50000 };
    const price = defaultVariant.price;

    // Delete existing plans
    await prisma.emiPlan.deleteMany({
      where: { productId: product.id },
    });

    let newPlans = [];

    if (price >= 50000) {
      // 4 EMI plans for flagship items
      newPlans = [
        {
          tenureMonths: 3,
          monthlyAmount: Math.round(price / 3),
          interestRate: 0.0,
          cashbackAmount: Math.min(Math.round(price * 0.02), 2000),
          isZeroInterest: true,
          minMfPledge: Math.round(price * 1.5),
        },
        {
          tenureMonths: 6,
          monthlyAmount: Math.round(price / 6),
          interestRate: 0.0,
          cashbackAmount: Math.min(Math.round(price * 0.035), 5000),
          isZeroInterest: true,
          minMfPledge: Math.round(price * 1.5),
        },
        {
          tenureMonths: 12,
          monthlyAmount: Math.round(price / 12),
          interestRate: 0.0,
          cashbackAmount: Math.min(Math.round(price * 0.05), 8500),
          isZeroInterest: true,
          minMfPledge: Math.round(price * 1.5),
        },
        {
          tenureMonths: 24,
          monthlyAmount: Math.round(price / 24),
          interestRate: 0.0,
          cashbackAmount: Math.min(Math.round(price * 0.05), 8500),
          isZeroInterest: true,
          minMfPledge: Math.round(price * 1.5),
        },
      ];
    } else if (price >= 15000) {
      // 3 or 4 EMI plans for mid-tier items
      newPlans = [
        {
          tenureMonths: 3,
          monthlyAmount: Math.round(price / 3),
          interestRate: 0.0,
          cashbackAmount: Math.min(Math.round(price * 0.02), 1000),
          isZeroInterest: true,
          minMfPledge: Math.round(price * 1.5),
        },
        {
          tenureMonths: 6,
          monthlyAmount: Math.round(price / 6),
          interestRate: 0.0,
          cashbackAmount: Math.min(Math.round(price * 0.04), 2500),
          isZeroInterest: true,
          minMfPledge: Math.round(price * 1.5),
        },
        {
          tenureMonths: 12,
          monthlyAmount: Math.round(price / 12),
          interestRate: 0.0,
          cashbackAmount: Math.min(Math.round(price * 0.05), 4000),
          isZeroInterest: true,
          minMfPledge: Math.round(price * 1.5),
        },
      ];
    } else {
      // 3 EMI plans for accessory & entry items
      newPlans = [
        {
          tenureMonths: 3,
          monthlyAmount: Math.round(price / 3),
          interestRate: 0.0,
          cashbackAmount: Math.min(Math.round(price * 0.03), 500),
          isZeroInterest: true,
          minMfPledge: Math.round(price * 1.5),
        },
        {
          tenureMonths: 6,
          monthlyAmount: Math.round(price / 6),
          interestRate: 0.0,
          cashbackAmount: Math.min(Math.round(price * 0.05), 1000),
          isZeroInterest: true,
          minMfPledge: Math.round(price * 1.5),
        },
        {
          tenureMonths: 12,
          monthlyAmount: Math.round(price / 12),
          interestRate: 0.0,
          cashbackAmount: Math.min(Math.round(price * 0.07), 1500),
          isZeroInterest: true,
          minMfPledge: Math.round(price * 1.5),
        },
      ];
    }

    await prisma.emiPlan.createMany({
      data: newPlans.map((plan) => ({
        ...plan,
        productId: product.id,
      })),
    });

    console.log(`Updated ${product.name}: ${newPlans.length} EMI plans added.`);
  }

  console.log("All products updated successfully!");
}

updateAllEmiPlans()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
