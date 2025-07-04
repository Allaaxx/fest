"use client";
import dynamic from "next/dynamic";

const ProductPreviewPage = dynamic(() => import("@/components/shared/product-preview-page"), { ssr: false });

import { useSearchParams, useRouter } from "next/navigation";


import { useEffect, useState } from "react";

export default function ProductEditPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    fetch(`/api/produtos/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Produto não encontrado");
        return res.json();
      })
      .then((data) => setProduct(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (!id) {
    return (
      <div className="p-8 text-center text-gray-500">
        ID do produto não informado.<br />
        <button
          className="mt-4 px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-medium"
          onClick={() => router.push("/admin/dashboard/products")}
        >
          Voltar para lista de produtos
        </button>
      </div>
    );
  }
  if (loading) {
    return <div className="p-8 text-center text-gray-500">Carregando produto...</div>;
  }
  if (error) {
    return (
      <div className="p-8 text-center text-red-600">
        {error}
        <br />
        <button
          className="mt-4 px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-medium"
          onClick={() => router.push("/admin/dashboard/products")}
        >
          Voltar para lista de produtos
        </button>
      </div>
    );
  }

  return <ProductPreviewPage mode="edit" initialProduct={product} />;
}
