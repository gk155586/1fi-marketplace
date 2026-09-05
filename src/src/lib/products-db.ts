import { prisma } from "@/lib/prisma";
import { FALLBACK_PRODUCTS } from "@/lib/catalog-data";
import { Product, ProductVariant, EmiPlan } from "@/types";

// In-memory mutable stock store for serverless fallback execution
const inMemoryStock: Record<string, number> = {};

export async function getAllProductsFromDb(options?: {
  category?: string | null;
  search?: string | null;
}): Promise<Product[]> {
  const { category, search } = options || {};

  try {
    const where: any = {};
    if (category && category !== "all") where.category = category;
    if (search && search.trim().length > 0) {
      const q = search.trim();
      where.OR = [
        { name: { contains: q } },
        { brand: { contains: q } },
        { description: { contains: q } },
      ];
    }

    const dbProducts = await prisma.product.findMany({
      where,
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

    if (dbProducts && dbProducts.length > 0) {
      return dbProducts as any;
    }
  } catch (err) {
    console.warn("Prisma query failed or SQLite unavailable on serverless, using fallback catalog:", err);
  }

  // Fallback to static catalog
  let filtered = FALLBACK_PRODUCTS.map((p) => ({
    ...p,
    variants: p.variants.map((v) => ({
      ...v,
      stockQuantity: inMemoryStock[v.id] !== undefined ? inMemoryStock[v.id] : v.stockQuantity,
    })),
  }));

  if (category && category !== "all") {
    filtered = filtered.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  }

  if (search && search.trim().length > 0) {
    const q = search.toLowerCase().trim();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }

  return filtered;
}

export async function getProductBySlugFromDb(slugOrId: string): Promise<Product | null> {
  try {
    const product = await prisma.product.findFirst({
      where: {
        OR: [{ slug: slugOrId }, { id: slugOrId }],
      },
      include: {
        variants: {
          orderBy: { price: "asc" },
        },
        emiPlans: {
          orderBy: { tenureMonths: "asc" },
        },
      },
    });

    if (product) return product as any;
  } catch (err) {
    console.warn("Prisma getProductBySlug failed, using fallback:", err);
  }

  const fallback = FALLBACK_PRODUCTS.find(
    (p) => p.slug === slugOrId || p.id === slugOrId
  );

  if (!fallback) return null;

  return {
    ...fallback,
    variants: fallback.variants.map((v) => ({
      ...v,
      stockQuantity: inMemoryStock[v.id] !== undefined ? inMemoryStock[v.id] : v.stockQuantity,
    })),
  };
}

export async function deductVariantStock(
  variantId: string
): Promise<{ remainingStock: number } | null> {
  try {
    const updated = await prisma.productVariant.update({
      where: { id: variantId },
      data: { stockQuantity: { decrement: 1 } },
    });
    return { remainingStock: updated.stockQuantity };
  } catch (err) {
    console.warn("Prisma deductVariantStock failed, updating in-memory stock:", err);
  }

  // Find variant in fallback
  for (const product of FALLBACK_PRODUCTS) {
    const variant = product.variants.find((v) => v.id === variantId);
    if (variant) {
      const currentStock = inMemoryStock[variantId] !== undefined ? inMemoryStock[variantId] : variant.stockQuantity;
      const nextStock = Math.max(0, currentStock - 1);
      inMemoryStock[variantId] = nextStock;
      return { remainingStock: nextStock };
    }
  }

  return null;
}
