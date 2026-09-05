import { getAllProductsFromDb } from "@/lib/products-db";
import { successResponse, errorResponse } from "@/lib/api-response";
import { sanitizeString } from "@/lib/security";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryParam = searchParams.get("category");
    const searchParam = searchParams.get("search");

    const category = categoryParam ? sanitizeString(categoryParam, 32) : null;
    const search = searchParam ? sanitizeString(searchParam, 64) : null;

    const products = await getAllProductsFromDb({ category, search });

    return successResponse(products);
  } catch (error) {
    console.error("Catalog API error:", error);
    return errorResponse("Internal server error while retrieving catalog", 500, "DATABASE_ERROR");
  }
}
