import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api-response";
import { sanitizeString } from "@/lib/security";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const rawSlug = params.slug;
    if (!rawSlug) {
      return errorResponse("Product slug is required", 400, "MISSING_SLUG");
    }

    const slug = sanitizeString(rawSlug, 64);

    const product = await prisma.product.findFirst({
      where: {
        OR: [{ slug }, { id: slug }],
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

    if (!product) {
      return errorResponse("Product not found", 404, "PRODUCT_NOT_FOUND");
    }

    return successResponse(product);
  } catch (error) {
    return errorResponse("Internal server error", 500, "INTERNAL_ERROR");
  }
}
