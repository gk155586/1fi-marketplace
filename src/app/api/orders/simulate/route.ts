import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api-response";
import {
  checkRateLimit,
  sanitizeString,
  isValidIndianPan,
  isValidIndianPhone,
} from "@/lib/security";

export async function POST(request: Request) {
  try {
    const forwardedFor = request.headers.get("x-forwarded-for");
    const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";

    const { allowed } = checkRateLimit(clientIp, 20, 60 * 1000);
    if (!allowed) {
      return errorResponse("Too many requests. Please try again in 1 minute.", 429, "RATE_LIMIT_EXCEEDED");
    }

    let body: any;
    try {
      body = await request.json();
    } catch {
      return errorResponse("Invalid JSON payload", 400, "MALFORMED_JSON");
    }

    const { productId, variantId, emiPlanId, customerName, phone, pan, folioNumber } = body;

    if (!productId || !variantId || !emiPlanId) {
      return errorResponse("Product, variant, and EMI plan identifiers are required", 400, "MISSING_REQUIRED_FIELDS");
    }

    const cleanProductId = sanitizeString(productId, 64);
    const cleanVariantId = sanitizeString(variantId, 64);
    const cleanPlanId = sanitizeString(emiPlanId, 64);
    const cleanName = sanitizeString(customerName || "Customer", 60);
    const cleanPhone = phone ? sanitizeString(phone, 15) : null;
    const cleanPan = pan ? sanitizeString(pan, 10).toUpperCase() : null;

    if (cleanPan && !isValidIndianPan(cleanPan)) {
      return errorResponse("Invalid Indian PAN format (e.g. ABCDE1234F)", 400, "INVALID_PAN");
    }

    if (cleanPhone && !isValidIndianPhone(cleanPhone)) {
      return errorResponse("Invalid 10-digit Indian mobile number", 400, "INVALID_PHONE");
    }

    const product = await prisma.product.findUnique({
      where: { id: cleanProductId },
      include: {
        variants: true,
        emiPlans: true,
      },
    });

    if (!product) {
      return errorResponse("Specified product does not exist", 404, "PRODUCT_NOT_FOUND");
    }

    const variant = product.variants.find((v) => v.id === cleanVariantId);
    if (!variant) {
      return errorResponse("Selected variant does not belong to this product", 400, "INVALID_VARIANT_RELATION");
    }

    const emiPlan = product.emiPlans.find((p) => p.id === cleanPlanId);
    if (!emiPlan) {
      return errorResponse("Selected EMI plan does not belong to this product", 400, "INVALID_EMI_RELATION");
    }

    if (variant.stockQuantity <= 0) {
      return errorResponse("This product variant is currently out of stock", 400, "OUT_OF_STOCK");
    }

    // Atomically decrement stock in database
    const updatedVariant = await prisma.productVariant.update({
      where: { id: cleanVariantId },
      data: {
        stockQuantity: {
          decrement: 1,
        },
      },
    });

    const orderId = "1FI-" + Math.random().toString(36).substring(2, 9).toUpperCase();
    const pledgeRef = "MF-" + Math.random().toString(36).substring(2, 8).toUpperCase();
    const requiredCollateral = Math.round(variant.price * 1.5);

    return successResponse({
      orderId,
      pledgeRef,
      status: "PLEDGE_APPROVED",
      productName: product.name,
      variant: `${variant.colorName} • ${variant.storage}`,
      variantId: updatedVariant.id,
      remainingStock: updatedVariant.stockQuantity,
      loanAmount: variant.price,
      monthlyEmi: emiPlan.monthlyAmount,
      tenureMonths: emiPlan.tenureMonths,
      cashbackAmount: emiPlan.cashbackAmount,
      pledgedCollateralValue: requiredCollateral,
      customerName: cleanName,
      folioNumber: sanitizeString(folioNumber || "FOLIO-CAMS-78901", 30),
      message: "Mutual fund lien successfully registered via RTA. 0% EMI order approved.",
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    return errorResponse("Internal server error creating pledge order", 500, "INTERNAL_ERROR");
  }
}
