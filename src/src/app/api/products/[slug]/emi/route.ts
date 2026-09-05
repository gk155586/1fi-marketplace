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
      return errorResponse("Product identifier is required", 400, "MISSING_SLUG");
    }

    const slug = sanitizeString(rawSlug, 64);
    const { searchParams } = new URL(request.url);
    const variantIdParam = searchParams.get("variantId");
    const customPriceParam = searchParams.get("price");

    const product = await getProductBySlugFromDb(slug);

    if (!product) {
      return errorResponse("Product not found", 404, "PRODUCT_NOT_FOUND");
    }

    let targetPrice = product.variants[0]?.price || 100000;

    if (variantIdParam) {
      const sanitizedVariantId = sanitizeString(variantIdParam, 64);
      const selectedVariant = product.variants.find((v) => v.id === sanitizedVariantId);
      if (!selectedVariant) {
        return errorResponse("Invalid variant ID for this product", 400, "INVALID_VARIANT");
      }
      targetPrice = selectedVariant.price;
    } else if (customPriceParam) {
      const parsed = Number(customPriceParam);
      if (isNaN(parsed) || !Number.isFinite(parsed) || parsed < 1000 || parsed > 10000000) {
        return errorResponse("Price must be a valid number between ₹1,000 and ₹1,00,00,000", 400, "INVALID_PRICE");
      }
      targetPrice = Math.round(parsed);
    }

    const computedPlans = product.emiPlans.map((plan) => {
      let monthly = Math.round(targetPrice / plan.tenureMonths);

      if (plan.interestRate > 0) {
        const monthlyRate = plan.interestRate / 12 / 100;
        const compoundFactor = Math.pow(1 + monthlyRate, plan.tenureMonths);
        const emi = (targetPrice * monthlyRate * compoundFactor) / (compoundFactor - 1);
        monthly = Math.round(emi);
      }

      return {
        id: plan.id,
        tenureMonths: plan.tenureMonths,
        monthlyAmount: monthly,
        interestRate: plan.interestRate,
        cashbackAmount: plan.cashbackAmount,
        isZeroInterest: plan.isZeroInterest,
        minMfPledge: Math.round(targetPrice * 1.5),
      };
    });

    return successResponse({
      productId: product.id,
      slug: product.slug,
      targetPrice,
      plans: computedPlans,
    });
  } catch (error) {
    return errorResponse("Internal server error calculating loan schedule", 500, "INTERNAL_ERROR");
  }
}
