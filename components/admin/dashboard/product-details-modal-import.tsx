import dynamic from "next/dynamic";
export const ProductDetailsModal = dynamic(() => import("@/components/admin/dashboard/product-details-modal").then(mod => mod.ProductDetailsModal), { ssr: false });
