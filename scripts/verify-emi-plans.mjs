import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function checkEmiPlans() {
  const products = await prisma.product.findMany({
    include: {
      emiPlans: true,
      variants: true,
    },
  });

  console.log(`Total products: ${products.length}`);
  for (const p of products) {
    console.log(`- ${p.name} (${p.slug}): ${p.emiPlans.length} EMI plans [${p.emiPlans.map(e => `${e.tenureMonths}M @ ₹${e.monthlyAmount}`).join(', ')}]`);
  }
}

checkEmiPlans()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
