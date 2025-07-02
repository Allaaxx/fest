"use client";
import dynamic from "next/dynamic";

const ProductPreviewPage = dynamic(() => import("@/components/shared/product-preview-page"), { ssr: false });

import { useSearchParams, useRouter } from "next/navigation";

export default function ProductEditPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");

  
  // Apenas renderiza o componente de edição, o id pode ser acessado via useSearchParams dentro do próprio ProductPreviewPage se necessário
  return <ProductPreviewPage mode="edit" />;
}
