import type React from "react"

export default function VendedorDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

// Este arquivo foi removido para evitar duplicidade de layouts (Navbar/Footer) na dashboard do vendedor.
