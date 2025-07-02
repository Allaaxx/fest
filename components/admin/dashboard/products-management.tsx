"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Check,
  X,
  Package,
  AlertTriangle,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  type: "venda" | "locacao" | "servico";
  price: number;
  status: "pending" | "approved" | "rejected" | "active" | "inactive";
  vendor: {
    name: string;
    id: string;
  };
  createdAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  rejectionReason?: string;
  sales: number;
  views: number;
}

interface ActionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason?: string) => void;
  title: string;
  description: string;
  actionType: "delete" | "approve" | "reject" | "edit";
  product?: Product;
}

function ActionDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  actionType,
  product,
}: ActionDialogProps) {
  const [reason, setReason] = useState("");

  const handleConfirm = () => {
    onConfirm(reason);
    setReason("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {actionType === "delete" && (
              <Trash2 className="h-5 w-5 text-red-500" />
            )}
            {actionType === "approve" && (
              <Check className="h-5 w-5 text-green-500" />
            )}
            {actionType === "reject" && <X className="h-5 w-5 text-red-500" />}
            {actionType === "edit" && (
              <Edit className="h-5 w-5 text-blue-500" />
            )}
            {title}
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {(actionType === "reject" || actionType === "delete") && (
          <div className="space-y-2">
            <Label htmlFor="reason">
              Motivo {actionType === "reject" ? "(obrigatório)" : "(opcional)"}
            </Label>
            <Textarea
              id="reason"
              placeholder={`Descreva o motivo para ${actionType === "reject" ? "rejeitar" : "excluir"} este produto...`}
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
            disabled={actionType === "reject" && !reason.trim()}
            className={
              actionType === "delete" || actionType === "reject"
                ? "bg-red-600 hover:bg-red-700"
                : actionType === "approve"
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-blue-600 hover:bg-blue-700"
            }
          >
            {actionType === "delete" && "Excluir"}
            {actionType === "approve" && "Aprovar"}
            {actionType === "reject" && "Rejeitar"}
            {actionType === "edit" && "Salvar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Painel de estatísticas
function ProductsStatsPanel({
  total,
  pending,
  approved,
  rejected,
}: {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total de Produtos</p>
              <p className="text-2xl font-bold">{total}</p>
            </div>
            <Package className="h-8 w-8 text-blue-500" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pendentes</p>
              <p className="text-2xl font-bold text-yellow-600">{pending}</p>
            </div>
            <Clock className="h-8 w-8 text-yellow-500" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Aprovados</p>
              <p className="text-2xl font-bold text-green-600">{approved}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Rejeitados</p>
              <p className="text-2xl font-bold text-red-600">{rejected}</p>
            </div>
            <XCircle className="h-8 w-8 text-red-500" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Painel de filtros
function ProductsFilterPanel({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  categoryFilter,
  setCategoryFilter,
}: any) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      <div className="flex flex-col sm:flex-row gap-4 flex-1">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar produtos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os status</SelectItem>
            <SelectItem value="pending">Pendente</SelectItem>
            <SelectItem value="approved">Aprovado</SelectItem>
            <SelectItem value="rejected">Rejeitado</SelectItem>
            <SelectItem value="active">Ativo</SelectItem>
            <SelectItem value="inactive">Inativo</SelectItem>
          </SelectContent>
        </Select>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as categorias</SelectItem>
            <SelectItem value="decoracao-infantil">
              Decoração Infantil
            </SelectItem>
            <SelectItem value="decoracao-casamento">
              Decoração Casamento
            </SelectItem>
            <SelectItem value="buffet">Buffet</SelectItem>
            <SelectItem value="som">Som</SelectItem>
            <SelectItem value="fotografia">Fotografia</SelectItem>
            <SelectItem value="iluminacao">Iluminação</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

// Painel de lista de produtos
function ProductsListPanel({
  products,
  getTypeBadge,
  getStatusBadge,
  handleAction,
}: any) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Moderação de Produtos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3">Produto</th>
                <th className="text-left p-3">Vendedor</th>
                <th className="text-left p-3">Categoria</th>
                <th className="text-left p-3">Tipo</th>
                <th className="text-left p-3">Preço</th>
                <th className="text-left p-3">Status</th>
                <th className="text-left p-3">Data</th>
                <th className="text-left p-3">Ações</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product: any) => (
                <tr key={product.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">
                    <div>
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-gray-500 max-w-xs truncate">
                        {product.description}
                      </div>
                      {product.status === "rejected" &&
                        product.rejectionReason && (
                          <div className="text-xs text-red-600 mt-1 flex items-center gap-1">
                            <AlertTriangle className="h-3 w-3" />
                            {product.rejectionReason}
                          </div>
                        )}
                    </div>
                  </td>
                  <td className="p-3">{product.vendor.name}</td>
                  <td className="p-3 capitalize">
                    {product.category.replace("-", " ")}
                  </td>
                  <td className="p-3">{getTypeBadge(product.type)}</td>
                  <td className="p-3 font-medium">
                    {product.price.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </td>
                  <td className="p-3">{getStatusBadge(product.status)}</td>
                  <td className="p-3">
                    <div className="text-sm">
                      {new Date(product.createdAt).toLocaleDateString("pt-BR")}
                    </div>
                    {product.reviewedAt && (
                      <div className="text-xs text-gray-500">
                        Revisado em{" "}
                        {new Date(product.reviewedAt).toLocaleDateString(
                          "pt-BR"
                        )}
                      </div>
                    )}
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
                        {product.status === "pending" && (
                          <>
                            <DropdownMenuItem
                              onClick={() => handleAction("approve", product)}
                              className="text-green-600"
                            >
                              <Check className="h-4 w-4 mr-2" />
                              Aprovar
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleAction("reject", product)}
                              className="text-red-600"
                            >
                              <X className="h-4 w-4 mr-2" />
                              Rejeitar
                            </DropdownMenuItem>
                          </>
                        )}
                        <DropdownMenuItem
                          onClick={() => handleAction("edit", product)}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleAction("delete", product)}
                          className="text-red-600"
                        >
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

export function ProductsManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [actionDialog, setActionDialog] = useState<{
    isOpen: boolean;
    type: "delete" | "approve" | "reject" | "edit";
    product?: Product;
  }>({ isOpen: false, type: "delete" });

  // Mock data - em produção viria de uma API
  const products: Product[] = [
    {
      id: "1",
      name: "Decoração Rústica Completa",
      description: "Kit completo de decoração rústica para festas",
      category: "decoracao-infantil",
      type: "locacao",
      price: 1200,
      status: "pending",
      vendor: { name: "Maria Silva", id: "v1" },
      createdAt: "2024-01-20",
      sales: 0,
      views: 45,
    },
    {
      id: "2",
      name: "DJ Premium",
      description: "Serviço de DJ profissional com equipamentos",
      category: "som",
      type: "servico",
      price: 800,
      status: "approved",
      vendor: { name: "João Santos", id: "v2" },
      createdAt: "2024-01-18",
      reviewedAt: "2024-01-19",
      reviewedBy: "Admin",
      sales: 8,
      views: 156,
    },
    {
      id: "3",
      name: "Buffet Gourmet",
      description: "Buffet completo para eventos especiais",
      category: "buffet",
      type: "servico",
      price: 45,
      status: "active",
      vendor: { name: "Ana Costa", id: "v3" },
      createdAt: "2024-01-15",
      reviewedAt: "2024-01-16",
      reviewedBy: "Admin",
      sales: 15,
      views: 320,
    },
    {
      id: "4",
      name: "Fotografia Inadequada",
      description: "Serviço de fotografia com conteúdo inadequado",
      category: "fotografia",
      type: "servico",
      price: 1500,
      status: "rejected",
      vendor: { name: "Carlos Lima", id: "v4" },
      createdAt: "2024-01-12",
      reviewedAt: "2024-01-13",
      reviewedBy: "Admin",
      rejectionReason: "Conteúdo inadequado nas imagens de exemplo",
      sales: 0,
      views: 23,
    },
    {
      id: "5",
      name: "Flores Tropicais",
      description: "Arranjos florais tropicais para decoração",
      category: "decoracao-casamento",
      type: "venda",
      price: 300,
      status: "pending",
      vendor: { name: "Lucia Ferreira", id: "v5" },
      createdAt: "2024-01-10",
      sales: 0,
      views: 67,
    },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.vendor.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || product.status === statusFilter;
    const matchesCategory =
      categoryFilter === "all" || product.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Handlers agrupados
  const handlers = {
    setSearchTerm,
    setStatusFilter,
    setCategoryFilter,
    handleAction: (
      type: "delete" | "approve" | "reject" | "edit",
      product: Product
    ) => setActionDialog({ isOpen: true, type, product }),
    getStatusBadge: (status: string) => {
      switch (status) {
        case "pending":
          return (
            <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
              Pendente
            </Badge>
          );
        case "approved":
          return (
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
              Aprovado
            </Badge>
          );
        case "rejected":
          return (
            <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
              Rejeitado
            </Badge>
          );
        case "active":
          return (
            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
              Ativo
            </Badge>
          );
        case "inactive":
          return (
            <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
              Inativo
            </Badge>
          );
        default:
          return <Badge variant="outline">{status}</Badge>;
      }
    },
    getTypeBadge: (type: string) => {
      switch (type) {
        case "venda":
          return (
            <Badge variant="outline" className="bg-blue-50 text-blue-700">
              Venda
            </Badge>
          );
        case "locacao":
          return (
            <Badge variant="outline" className="bg-purple-50 text-purple-700">
              Locação
            </Badge>
          );
        case "servico":
          return (
            <Badge variant="outline" className="bg-orange-50 text-orange-700">
              Serviço
            </Badge>
          );
        default:
          return <Badge variant="outline">{type}</Badge>;
      }
    },
  };

  const confirmAction = (reason?: string) => {
    const { type, product } = actionDialog;
    if (!product) return;
    // Aqui você implementaria a lógica real da API
    switch (type) {
      case "delete":
        console.log("Excluindo produto:", product.id, "Motivo:", reason);
        break;
      case "approve":
        console.log("Aprovando produto:", product.id);
        break;
      case "reject":
        console.log("Rejeitando produto:", product.id, "Motivo:", reason);
        break;
      case "edit":
        console.log("Editando produto:", product.id);
        break;
    }
  };

  const totalProducts = products.length;
  const pendingProducts = products.filter((p) => p.status === "pending").length;
  const approvedProducts = products.filter(
    (p) => p.status === "approved" || p.status === "active"
  ).length;
  const rejectedProducts = products.filter(
    (p) => p.status === "rejected"
  ).length;

  return (
    <div className="space-y-6">
      <ProductsStatsPanel
        total={totalProducts}
        pending={pendingProducts}
        approved={approvedProducts}
        rejected={rejectedProducts}
      />
      <ProductsFilterPanel
        searchTerm={searchTerm}
        setSearchTerm={handlers.setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={handlers.setStatusFilter}
        categoryFilter={categoryFilter}
        setCategoryFilter={handlers.setCategoryFilter}
      />
      <ProductsListPanel
        products={filteredProducts}
        getTypeBadge={handlers.getTypeBadge}
        getStatusBadge={handlers.getStatusBadge}
        handleAction={handlers.handleAction}
      />
      {filteredProducts.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhum produto encontrado
            </h3>
            <p className="text-gray-500">
              Não encontramos produtos que correspondam aos seus filtros.
            </p>
          </CardContent>
        </Card>
      )}
      <ActionDialog
        isOpen={actionDialog.isOpen}
        onClose={() => setActionDialog({ isOpen: false, type: "delete" })}
        onConfirm={confirmAction}
        product={actionDialog.product}
        actionType={actionDialog.type}
        title={
          actionDialog.type === "delete"
            ? "Excluir Produto"
            : actionDialog.type === "approve"
              ? "Aprovar Produto"
              : actionDialog.type === "reject"
                ? "Rejeitar Produto"
                : "Editar Produto"
        }
        description={
          actionDialog.type === "delete"
            ? `Tem certeza que deseja excluir o produto "${actionDialog.product?.name}"? Esta ação não pode ser desfeita.`
            : actionDialog.type === "approve"
              ? `Tem certeza que deseja aprovar o produto "${actionDialog.product?.name}"? O produto ficará disponível na plataforma.`
              : actionDialog.type === "reject"
                ? `Tem certeza que deseja rejeitar o produto "${actionDialog.product?.name}"? Informe o motivo da rejeição.`
                : `Edite as informações do produto "${actionDialog.product?.name}".`
        }
      />
    </div>
  );
}
