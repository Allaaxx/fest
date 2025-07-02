"use client";
import { CategoriesManagement } from "@/components/admin/produtos/categories/categories-management";

import { useSearchParams, useRouter } from "next/navigation";

export default function CategoryEditPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");


  // Apenas renderiza o componente de edição, o id pode ser acessado via useSearchParams dentro do próprio CategoriesManagement se necessário
  return <CategoriesManagement mode="edit" />;
}
