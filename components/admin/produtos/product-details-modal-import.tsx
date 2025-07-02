import dynamic from "next/dynamic";
export const ProductDetailsModal = dynamic(() => import("@/components/admin/produtos/product-details-modal").then(mod => mod.ProductDetailsModal), { ssr: false });
