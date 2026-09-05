import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

async function main() {
  const products = await prisma.product.findMany({
    include: {
      variants: {
        orderBy: { price: "asc" },
      },
      emiPlans: {
        orderBy: { tenureMonths: "asc" },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  console.log(`Found ${products.length} products in SQLite DB.`);

  const fileContent = `// Auto-generated fallback catalog data for resilient serverless & static execution
import { Product } from "@/types";

export const FALLBACK_PRODUCTS: Product[] = ${JSON.stringify(products, null, 2)};
`;

  fs.writeFileSync(path.join("src", "lib", "catalog-data.ts"), fileContent, "utf8");
  console.log("Successfully wrote src/lib/catalog-data.ts");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
