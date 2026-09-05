import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api-response";
import { sanitizeString } from "@/lib/security";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryParam = searchParams.get("category");
    const searchParam = searchParams.get("search");

    const category = categoryParam ? sanitizeString(categoryParam, 32) : null;
    const search = searchParam ? sanitizeString(searchParam, 64) : null;

    const where: any = {};
    if (category) where.category = category;
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { brand: { contains: search } },
        { description: { contains: search } },
      ];
    }

    const products = await prisma.product.findMany({
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

    return successResponse(products);
  } catch (error) {
    return errorResponse("Internal server error while retrieving catalog", 500, "DATABASE_ERROR");
  }
}
