
// Página raiz da dashboard agora redireciona para a visão geral
import { redirect } from "next/navigation";

export default function AdminDashboard() {
  redirect("/admin/dashboard/overview");
  return null;
}
