import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getProductBySlugFromDb } from "@/lib/products-db";
import ProductDetail from "@/components/ProductDetail";

export const dynamic = "force-dynamic";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = params;
  const product = await getProductBySlugFromDb(slug);

  if (!product) {
    return {
      title: "Product Not Found - 1Fi",
    };
  }

  return {
    title: `${product.name} with 0% Mutual Fund EMI | 1Fi`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = params;
  const product = await getProductBySlugFromDb(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product as any} />;
}
