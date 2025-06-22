import type React from "react"
import ClientLayout from "@/app/client-layout"

export default function VendedorDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClientLayout>{children}</ClientLayout>
}
