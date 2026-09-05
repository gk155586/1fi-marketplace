import { getProductBySlugFromDb } from "@/lib/products-db";
import { successResponse, errorResponse } from "@/lib/api-response";
import { sanitizeString } from "@/lib/security";

export const dynamic = "force-dynamic";

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
    const product = await getProductBySlugFromDb(slug);

    if (!product) {
      return errorResponse("Product not found", 404, "PRODUCT_NOT_FOUND");
    }

    return successResponse(product);
  } catch (error) {
    return errorResponse("Internal server error", 500, "INTERNAL_ERROR");
  }
}
