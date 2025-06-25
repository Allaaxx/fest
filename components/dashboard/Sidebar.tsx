import {
  Home,
  Package,
  Heart,
  Gift,
  User,
  X,
  LogOut,
  MessageCircle,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";

type TabType =
  | "overview"
  | "orders"
  | "favorites"
  | "loyalty"
  | "profile"
  | "messages";

type SidebarProps = {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
};

const menuItems = [
  { id: "overview", label: "Visão Geral", icon: Home },
  { id: "orders", label: "Meus Pedidos", icon: Package },
  { id: "favorites", label: "Favoritos", icon: Heart },
  { id: "loyalty", label: "Pontos de Fidelidade", icon: Gift },
  { id: "messages", label: "Mensagens", icon: MessageCircle },
  { id: "profile", label: "Meu Perfil", icon: User },
];

export default function Sidebar({
  activeTab,
  setActiveTab,
  sidebarOpen,
  setSidebarOpen,
}: SidebarProps) {
  const { data: session } = useSession();
  type UserWithPublicId = typeof session extends { user: infer U }
    ? U & { public_id?: string; image?: string | null; name?: string | null; email?: string | null }
    : { public_id?: string; image?: string | null; name?: string | null; email?: string | null };
  const user = session?.user as UserWithPublicId | undefined;

  // Estado para imagem reativa do backend
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    if (user?.email) {
      fetch(`/api/cliente/profile?email=${encodeURIComponent(user.email ?? "")}`)
        .then((res) => res.json())
        .then((data) => {
          if (data && data.profileImage && !data.profileImage.startsWith("blob:")) {
            setProfileImage(data.profileImage);
          } else {
            setProfileImage(null);
          }
        })
        .catch(() => setProfileImage(null));
    }
  }, [user?.email]);

  // Atualiza a imagem do perfil sempre que o usuário salvar alterações no Profile
  useEffect(() => {
    if (!user?.email) return;
    // Função para buscar imagem
    const fetchImage = () => {
      fetch(`/api/cliente/profile?email=${encodeURIComponent(user.email ?? "")}`)
        .then((res) => res.json())
        .then((data) => {
          if (data && data.profileImage && !data.profileImage.startsWith("blob:")) {
            setProfileImage(data.profileImage);
          } else {
            setProfileImage(null);
          }
        })
        .catch(() => setProfileImage(null));
    };
    fetchImage();
    // Adiciona um listener customizado para atualização reativa
    window.addEventListener("profile-image-updated", fetchImage);
    return () => {
      window.removeEventListener("profile-image-updated", fetchImage);
    };
  }, [user?.email]);

  return (
    <div
      className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 mt-16 lg:mt-0`}
    >
      <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
        <div className="flex items-center">
          {profileImage ? (
            <img
              src={profileImage}
              alt={user?.name || "Usuário"}
              className="w-8 h-8 rounded-lg object-cover bg-pink-100 border border-pink-200"
            />
          ) : (
            <div className="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">
                {user?.name ? user.name[0] : "C"}
              </span>
            </div>
          )}
          <span className="ml-2 text-xl font-bold text-gray-900">
            {user?.name || "Cliente"}
          </span>
        </div>
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden text-gray-500 hover:text-gray-700"
        >
          <X className="h-6 w-6" />
        </button>
      </div>
      <nav className="mt-6 px-3 flex flex-col h-[calc(100vh-4rem-2.5rem)]">
        <div className="flex-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id as TabType);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center px-3 py-3 mb-1 text-left rounded-lg transition-colors ${
                  activeTab === item.id
                    ? "bg-pink-50 text-pink-600 border-r-2 border-pink-500"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon className="h-5 w-5 mr-3" />
                {item.label}
              </button>
            );
          })}
        </div>
        <button
          onClick={() => signOut()}
          className="w-full flex items-center px-3 py-3 mb-1 text-left rounded-lg transition-colors text-gray-600 hover:bg-gray-50 hover:text-gray-900 mt-auto"
        >
          <LogOut className="h-5 w-5 mr-3" />
          Sair
        </button>
      </nav>
    </div>
  );
}
