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
import { Search, MoreHorizontal, Edit, Trash2, Ban, UserX, Users, UserCheck, Calendar, Mail, Phone } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  phone?: string
  role: "admin" | "vendor" | "customer"
  status: "active" | "suspended" | "banned" | "inactive"
  createdAt: string
  lastLogin?: string
  totalOrders: number
  totalSpent: number
  avatar?: string
}

interface ActionDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (reason?: string) => void
  title: string
  description: string
  actionType: "delete" | "ban" | "suspend" | "edit"
  user?: User
}

function ActionDialog({ isOpen, onClose, onConfirm, title, description, actionType, user }: ActionDialogProps) {
  const [reason, setReason] = useState("")
  const [editData, setEditData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    role: user?.role || "customer",
  })

  const handleConfirm = () => {
    if (actionType === "edit") {
      onConfirm(JSON.stringify(editData))
    } else {
      onConfirm(reason)
    }
    setReason("")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {actionType === "delete" && <Trash2 className="h-5 w-5 text-red-500" />}
            {actionType === "ban" && <Ban className="h-5 w-5 text-red-500" />}
            {actionType === "suspend" && <UserX className="h-5 w-5 text-yellow-500" />}
            {actionType === "edit" && <Edit className="h-5 w-5 text-blue-500" />}
            {title}
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {actionType === "edit" ? (
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  value={editData.name}
                  onChange={(e) => setEditData((prev) => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={editData.email}
                  onChange={(e) => setEditData((prev) => ({ ...prev, email: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  value={editData.phone}
                  onChange={(e) => setEditData((prev) => ({ ...prev, phone: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="role">Função</Label>
                <Select
                  value={editData.role}
                  onValueChange={(value: any) => setEditData((prev) => ({ ...prev, role: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="customer">Cliente</SelectItem>
                    <SelectItem value="vendor">Vendedor</SelectItem>
                    <SelectItem value="admin">Administrador</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          ) : (
            <div>
              <Label htmlFor="reason">Motivo {actionType !== "delete" ? "(opcional)" : ""}</Label>
              <Textarea
                id="reason"
                placeholder={`Descreva o motivo para ${actionType === "delete" ? "excluir" : actionType === "ban" ? "banir" : "suspender"} este usuário...`}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="min-h-20"
              />
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            onClick={handleConfirm}
            className={
              actionType === "delete" || actionType === "ban"
                ? "bg-red-600 hover:bg-red-700"
                : actionType === "suspend"
                  ? "bg-yellow-600 hover:bg-yellow-700"
                  : "bg-blue-600 hover:bg-blue-700"
            }
          >
            {actionType === "delete" && "Excluir"}
            {actionType === "ban" && "Banir"}
            {actionType === "suspend" && "Suspender"}
            {actionType === "edit" && "Salvar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function UsersManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [actionDialog, setActionDialog] = useState<{
    isOpen: boolean
    type: "delete" | "ban" | "suspend" | "edit"
    user?: User
  }>({ isOpen: false, type: "delete" })

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
      totalOrders: 5,
      totalSpent: 2500,
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
      totalOrders: 0,
      totalSpent: 0,
    },
    {
      id: "3",
      name: "Carlos Lima",
      email: "carlos@email.com",
      role: "customer",
      status: "suspended",
      createdAt: "2024-01-08",
      lastLogin: "2024-01-18",
      totalOrders: 2,
      totalSpent: 800,
    },
    {
      id: "4",
      name: "Ana Costa",
      email: "ana@email.com",
      phone: "(11) 77777-7777",
      role: "vendor",
      status: "active",
      createdAt: "2024-01-05",
      lastLogin: "2024-01-21",
      totalOrders: 0,
      totalSpent: 0,
    },
    {
      id: "5",
      name: "Pedro Oliveira",
      email: "pedro@email.com",
      role: "customer",
      status: "banned",
      createdAt: "2024-01-03",
      lastLogin: "2024-01-10",
      totalOrders: 1,
      totalSpent: 150,
    },
  ]

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRole = roleFilter === "all" || user.role === roleFilter
    const matchesStatus = statusFilter === "all" || user.status === statusFilter

    return matchesSearch && matchesRole && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Ativo</Badge>
      case "suspended":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Suspenso</Badge>
      case "banned":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Banido</Badge>
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Inativo</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Admin</Badge>
      case "vendor":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Vendedor</Badge>
      case "customer":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Cliente</Badge>
      default:
        return <Badge variant="outline">{role}</Badge>
    }
  }

  const handleAction = (type: "delete" | "ban" | "suspend" | "edit", user: User) => {
    setActionDialog({ isOpen: true, type, user })
  }

  const confirmAction = (reason?: string) => {
    const { type, user } = actionDialog
    if (!user) return

    console.log(`${type} user:`, user.id, reason)

    // Aqui você implementaria a lógica real da API
    switch (type) {
      case "delete":
        console.log("Excluindo usuário:", user.id, "Motivo:", reason)
        break
      case "ban":
        console.log("Banindo usuário:", user.id, "Motivo:", reason)
        break
      case "suspend":
        console.log("Suspendendo usuário:", user.id, "Motivo:", reason)
        break
      case "edit":
        console.log("Editando usuário:", user.id, "Dados:", reason)
        break
    }
  }

  const totalUsers = users.length
  const activeUsers = users.filter((u) => u.status === "active").length
  const suspendedUsers = users.filter((u) => u.status === "suspended").length
  const bannedUsers = users.filter((u) => u.status === "banned").length

  return (
    <div className="space-y-6">
      {/* Header com estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total de Usuários</p>
                <p className="text-2xl font-bold">{totalUsers}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Usuários Ativos</p>
                <p className="text-2xl font-bold text-green-600">{activeUsers}</p>
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
                <p className="text-2xl font-bold text-yellow-600">{suspendedUsers}</p>
              </div>
              <UserX className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Banidos</p>
                <p className="text-2xl font-bold text-red-600">{bannedUsers}</p>
              </div>
              <Ban className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Controles e filtros */}
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
              <SelectItem value="admin">Administrador</SelectItem>
              <SelectItem value="vendor">Vendedor</SelectItem>
              <SelectItem value="customer">Cliente</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="active">Ativo</SelectItem>
              <SelectItem value="suspended">Suspenso</SelectItem>
              <SelectItem value="banned">Banido</SelectItem>
              <SelectItem value="inactive">Inativo</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Lista de usuários */}
      <Card>
        <CardHeader>
          <CardTitle>Usuários do Sistema</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Usuário</th>
                  <th className="text-left p-3">Função</th>
                  <th className="text-left p-3">Status</th>
                  <th className="text-left p-3">Cadastro</th>
                  <th className="text-left p-3">Último Login</th>
                  <th className="text-left p-3">Pedidos</th>
                  <th className="text-left p-3">Total Gasto</th>
                  <th className="text-left p-3">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {user.email}
                        </div>
                        {user.phone && (
                          <div className="text-sm text-gray-500 flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {user.phone}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-3">{getRoleBadge(user.role)}</td>
                    <td className="p-3">{getStatusBadge(user.status)}</td>
                    <td className="p-3">
                      <div className="text-sm flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(user.createdAt).toLocaleDateString("pt-BR")}
                      </div>
                    </td>
                    <td className="p-3">
                      {user.lastLogin ? (
                        <div className="text-sm">{new Date(user.lastLogin).toLocaleDateString("pt-BR")}</div>
                      ) : (
                        <span className="text-gray-400 text-sm">Nunca</span>
                      )}
                    </td>
                    <td className="p-3">{user.totalOrders}</td>
                    <td className="p-3">
                      {user.totalSpent.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                    </td>
                    <td className="p-3">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleAction("edit", user)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Editar
                          </DropdownMenuItem>
                          {user.status === "active" && (
                            <DropdownMenuItem onClick={() => handleAction("suspend", user)} className="text-yellow-600">
                              <UserX className="h-4 w-4 mr-2" />
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

      {filteredUsers.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum usuário encontrado</h3>
            <p className="text-gray-500">Não encontramos usuários que correspondam aos seus filtros.</p>
          </CardContent>
        </Card>
      )}

      {/* Dialog de ações */}
      <ActionDialog
        isOpen={actionDialog.isOpen}
        onClose={() => setActionDialog({ isOpen: false, type: "delete" })}
        onConfirm={confirmAction}
        user={actionDialog.user}
        actionType={actionDialog.type}
        title={
          actionDialog.type === "delete"
            ? "Excluir Usuário"
            : actionDialog.type === "ban"
              ? "Banir Usuário"
              : actionDialog.type === "suspend"
                ? "Suspender Usuário"
                : "Editar Usuário"
        }
        description={
          actionDialog.type === "delete"
            ? `Tem certeza que deseja excluir o usuário "${actionDialog.user?.name}"? Esta ação não pode ser desfeita.`
            : actionDialog.type === "ban"
              ? `Tem certeza que deseja banir o usuário "${actionDialog.user?.name}"? O usuário não poderá mais acessar a plataforma.`
              : actionDialog.type === "suspend"
                ? `Tem certeza que deseja suspender o usuário "${actionDialog.user?.name}"? O usuário ficará temporariamente impedido de usar a plataforma.`
                : `Edite as informações do usuário "${actionDialog.user?.name}".`
        }
      />
    </div>
  )
}
