"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Ban,
  Clock,
  Users,
  UserCheck,
  UserX,
  UserMinus,
  Eye,
  Mail,
  Phone,
  MapPin,
} from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  phone: string
  role: "customer" | "vendor" | "admin"
  status: "active" | "suspended" | "banned" | "inactive"
  createdAt: string
  lastLogin?: string
  orders: number
  totalSpent: number
  location: string
}

interface ActionDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (reason?: string) => void
  title: string
  description: string
  actionType: "delete" | "suspend" | "ban" | "edit"
  user?: User
}

function ActionDialog({ isOpen, onClose, onConfirm, title, description, actionType, user }: ActionDialogProps) {
  const [reason, setReason] = useState("")

  const handleConfirm = () => {
    onConfirm(reason)
    setReason("")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {actionType === "delete" && <Trash2 className="h-5 w-5 text-red-500" />}
            {actionType === "suspend" && <Clock className="h-5 w-5 text-yellow-500" />}
            {actionType === "ban" && <Ban className="h-5 w-5 text-red-500" />}
            {actionType === "edit" && <Edit className="h-5 w-5 text-blue-500" />}
            {title}
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {(actionType === "suspend" || actionType === "ban" || actionType === "delete") && (
          <div className="space-y-2">
            <Label htmlFor="reason">Motivo {actionType === "ban" ? "(obrigatório)" : "(opcional)"}</Label>
            <Textarea
              id="reason"
              placeholder={`Descreva o motivo para ${
                actionType === "suspend" ? "suspender" : actionType === "ban" ? "banir" : "excluir"
              } este usuário...`}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="min-h-20"
            />
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={actionType === "ban" && !reason.trim()}
            className={
              actionType === "delete" || actionType === "ban"
                ? "bg-red-600 hover:bg-red-700"
                : actionType === "suspend"
                  ? "bg-yellow-600 hover:bg-yellow-700"
                  : "bg-blue-600 hover:bg-blue-700"
            }
          >
            {actionType === "delete" && "Excluir"}
            {actionType === "suspend" && "Suspender"}
            {actionType === "ban" && "Banir"}
            {actionType === "edit" && "Salvar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Painel de estatísticas
function UsersStatsPanel({ total, active, suspended, banned }: { total: number; active: number; suspended: number; banned: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total de Usuários</p>
              <p className="text-2xl font-bold">{total}</p>
            </div>
            <Users className="h-8 w-8 text-blue-500" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Ativos</p>
              <p className="text-2xl font-bold text-green-600">{active}</p>
            </div>
            <UserCheck className="h-8 w-8 text-green-500" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Suspensos</p>
              <p className="text-2xl font-bold text-yellow-600">{suspended}</p>
            </div>
            <UserMinus className="h-8 w-8 text-yellow-500" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Banidos</p>
              <p className="text-2xl font-bold text-red-600">{banned}</p>
            </div>
            <UserX className="h-8 w-8 text-red-500" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Painel de filtros
function UsersFilterPanel({ searchTerm, setSearchTerm, roleFilter, setRoleFilter, statusFilter, setStatusFilter }: any) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      <div className="flex flex-col sm:flex-row gap-4 flex-1">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar usuários..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Função" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as funções</SelectItem>
            <SelectItem value="customer">Cliente</SelectItem>
            <SelectItem value="vendor">Vendedor</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os status</SelectItem>
            <SelectItem value="active">Ativo</SelectItem>
            <SelectItem value="suspended">Suspenso</SelectItem>
            <SelectItem value="banned">Banido</SelectItem>
            <SelectItem value="inactive">Inativo</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

// Painel de lista de usuários
function UsersListPanel({ users, getRoleBadge, getStatusBadge, handleAction }: any) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gerenciamento de Usuários</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3">Usuário</th>
                <th className="text-left p-3">Contato</th>
                <th className="text-left p-3">Função</th>
                <th className="text-left p-3">Status</th>
                <th className="text-left p-3">Pedidos</th>
                <th className="text-left p-3">Total Gasto</th>
                <th className="text-left p-3">Último Login</th>
                <th className="text-left p-3">Ações</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: any) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {user.location}
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="space-y-1">
                      <div className="text-sm flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {user.email}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {user.phone}
                      </div>
                    </div>
                  </td>
                  <td className="p-3">{getRoleBadge(user.role)}</td>
                  <td className="p-3">{getStatusBadge(user.status)}</td>
                  <td className="p-3 font-medium">{user.orders}</td>
                  <td className="p-3 font-medium">
                    {user.totalSpent.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                  </td>
                  <td className="p-3">
                    <div className="text-sm">
                      {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString("pt-BR") : "Nunca"}
                    </div>
                    <div className="text-xs text-gray-500">
                      Cadastrado em {new Date(user.createdAt).toLocaleDateString("pt-BR")}
                    </div>
                  </td>
                  <td className="p-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          Ver Detalhes
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleAction("edit", user)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Editar
                        </DropdownMenuItem>
                        {user.status === "active" && (
                          <DropdownMenuItem onClick={() => handleAction("suspend", user)} className="text-yellow-600">
                            <Clock className="h-4 w-4 mr-2" />
                            Suspender
                          </DropdownMenuItem>
                        )}
                        {user.status !== "banned" && (
                          <DropdownMenuItem onClick={() => handleAction("ban", user)} className="text-red-600">
                            <Ban className="h-4 w-4 mr-2" />
                            Banir
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem onClick={() => handleAction("delete", user)} className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

export function UsersManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [actionDialog, setActionDialog] = useState<{
    isOpen: boolean;
    type: "delete" | "suspend" | "ban" | "edit";
    user?: User;
  }>({ isOpen: false, type: "delete" });

  // Mock data - em produção viria de uma API
  const users: User[] = [
    {
      id: "1",
      name: "João Silva",
      email: "joao@email.com",
      phone: "(11) 99999-9999",
      role: "customer",
      status: "active",
      createdAt: "2024-01-15",
      lastLogin: "2024-01-20",
      orders: 5,
      totalSpent: 1250.0,
      location: "São Paulo, SP",
    },
    {
      id: "2",
      name: "Maria Santos",
      email: "maria@email.com",
      phone: "(11) 88888-8888",
      role: "vendor",
      status: "active",
      createdAt: "2024-01-10",
      lastLogin: "2024-01-19",
      orders: 0,
      totalSpent: 0,
      location: "Rio de Janeiro, RJ",
    },
    {
      id: "3",
      name: "Carlos Lima",
      email: "carlos@email.com",
      phone: "(11) 77777-7777",
      role: "customer",
      status: "suspended",
      createdAt: "2024-01-05",
      lastLogin: "2024-01-18",
      orders: 2,
      totalSpent: 450.0,
      location: "Belo Horizonte, MG",
    },
    {
      id: "4",
      name: "Ana Costa",
      email: "ana@email.com",
      phone: "(11) 66666-6666",
      role: "vendor",
      status: "active",
      createdAt: "2024-01-01",
      lastLogin: "2024-01-20",
      orders: 0,
      totalSpent: 0,
      location: "Salvador, BA",
    },
    {
      id: "5",
      name: "Pedro Oliveira",
      email: "pedro@email.com",
      phone: "(11) 55555-5555",
      role: "customer",
      status: "banned",
      createdAt: "2023-12-20",
      lastLogin: "2024-01-10",
      orders: 1,
      totalSpent: 200.0,
      location: "Fortaleza, CE",
    },
  ];

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm);
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Handlers agrupados
  const handlers = {
    setSearchTerm,
    setRoleFilter,
    setStatusFilter,
    handleAction: (type: "delete" | "suspend" | "ban" | "edit", user: User) => setActionDialog({ isOpen: true, type, user }),
    getStatusBadge: (status: string) => {
      switch (status) {
        case "active":
          return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Ativo</Badge>;
        case "suspended":
          return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Suspenso</Badge>;
        case "banned":
          return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Banido</Badge>;
        case "inactive":
          return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Inativo</Badge>;
        default:
          return <Badge variant="outline">{status}</Badge>;
      }
    },
    getRoleBadge: (role: string) => {
      switch (role) {
        case "customer":
          return <Badge variant="outline" className="bg-blue-50 text-blue-700">Cliente</Badge>;
        case "vendor":
          return <Badge variant="outline" className="bg-purple-50 text-purple-700">Vendedor</Badge>;
        case "admin":
          return <Badge variant="outline" className="bg-orange-50 text-orange-700">Admin</Badge>;
        default:
          return <Badge variant="outline">{role}</Badge>;
      }
    },
  };

  const confirmAction = (reason?: string) => {
    const { type, user } = actionDialog;
    if (!user) return;
    // Aqui você implementaria a lógica real da API
    switch (type) {
      case "delete":
        console.log("Excluindo usuário:", user.id, "Motivo:", reason);
        break;
      case "suspend":
        console.log("Suspendendo usuário:", user.id, "Motivo:", reason);
        break;
      case "ban":
        console.log("Banindo usuário:", user.id, "Motivo:", reason);
        break;
      case "edit":
        console.log("Editando usuário:", user.id);
        break;
    }
  };

  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u.status === "active").length;
  const suspendedUsers = users.filter((u) => u.status === "suspended").length;
  const bannedUsers = users.filter((u) => u.status === "banned").length;

  return (
    <div className="space-y-6">
      <UsersStatsPanel total={totalUsers} active={activeUsers} suspended={suspendedUsers} banned={bannedUsers} />
      <UsersFilterPanel
        searchTerm={searchTerm}
        setSearchTerm={handlers.setSearchTerm}
        roleFilter={roleFilter}
        setRoleFilter={handlers.setRoleFilter}
        statusFilter={statusFilter}
        setStatusFilter={handlers.setStatusFilter}
      />
      <UsersListPanel
        users={filteredUsers}
        getRoleBadge={handlers.getRoleBadge}
        getStatusBadge={handlers.getStatusBadge}
        handleAction={handlers.handleAction}
      />
      {filteredUsers.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum usuário encontrado</h3>
            <p className="text-gray-500">Não encontramos usuários que correspondam aos seus filtros.</p>
          </CardContent>
        </Card>
      )}
      <ActionDialog
        isOpen={actionDialog.isOpen}
        onClose={() => setActionDialog({ isOpen: false, type: "delete" })}
        onConfirm={confirmAction}
        user={actionDialog.user}
        actionType={actionDialog.type}
        title={
          actionDialog.type === "delete"
            ? "Excluir Usuário"
            : actionDialog.type === "suspend"
              ? "Suspender Usuário"
              : actionDialog.type === "ban"
                ? "Banir Usuário"
                : "Editar Usuário"
        }
        description={
          actionDialog.type === "delete"
            ? `Tem certeza que deseja excluir o usuário "${actionDialog.user?.name}"? Esta ação não pode ser desfeita.`
            : actionDialog.type === "suspend"
              ? `Tem certeza que deseja suspender o usuário "${actionDialog.user?.name}"? O usuário não poderá acessar a plataforma.`
              : actionDialog.type === "ban"
                ? `Tem certeza que deseja banir o usuário "${actionDialog.user?.name}"? Informe o motivo do banimento.`
                : `Edite as informações do usuário "${actionDialog.user?.name}".`
        }
      />
    </div>
  );
}
