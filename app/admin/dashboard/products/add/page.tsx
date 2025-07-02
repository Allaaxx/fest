"use client";
import dynamic from "next/dynamic";

const ProductPreviewPage = dynamic(
  () => import("@/components/shared/product-preview-page"),
  { ssr: false }
);

export default function ProductAddPage() {
  return <ProductPreviewPage mode="add" />;
}
