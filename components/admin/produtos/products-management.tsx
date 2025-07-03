"use client";

import { useState, useEffect } from "react";
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
import { ProductDetailsModal } from "./product-details-modal";

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
  rating: number;
  totalReviews: number;
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

export function ProductsManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [actionDialog, setActionDialog] = useState<{
    isOpen: boolean;
    type: "delete" | "approve" | "reject" | "edit";
    product?: Product;
  }>({ isOpen: false, type: "delete" });

  const [detailsModal, setDetailsModal] = useState<{
    isOpen: boolean;
    product?: Product;
  }>({ isOpen: false });

  // Busca produtos da API
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchProducts() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/produtos");
      if (!res.ok) throw new Error("Erro ao buscar produtos");
      const data = await res.json();
      setProducts(data);
    } catch (err: any) {
      setError(err.message || "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  }

  // Carrega produtos ao montar
  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.vendor?.name?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || product.status === statusFilter;
    const matchesCategory =
      categoryFilter === "all" || product.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusBadge = (status: string) => {
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
  };

  const getTypeBadge = (type: string) => {
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
  };

  const handleAction = (
    type: "delete" | "approve" | "reject" | "edit",
    product: Product
  ) => {
    setActionDialog({ isOpen: true, type, product });
  };

  const confirmAction = async (reason?: string) => {
    const { type, product } = actionDialog;
    if (!product) return;

    try {
      if (type === "delete") {
        await fetch(`/api/produtos/${product.id}`, { method: "DELETE" });
        setProducts((prev) => prev.filter((p) => p.id !== product.id));
      } else if (type === "approve") {
        const res = await fetch(`/api/produtos/${product.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...product, status: "approved", reviewedAt: new Date(), reviewedBy: "Admin" }),
        });
        if (res.ok) {
          const updated = await res.json();
          setProducts((prev) => prev.map((p) => (p.id === product.id ? updated : p)));
        }
      } else if (type === "reject") {
        const res = await fetch(`/api/produtos/${product.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...product, status: "rejected", reviewedAt: new Date(), reviewedBy: "Admin", rejectionReason: reason }),
        });
        if (res.ok) {
          const updated = await res.json();
          setProducts((prev) => prev.map((p) => (p.id === product.id ? updated : p)));
        }
      } else if (type === "edit") {
        // Aqui você pode abrir um modal de edição ou implementar lógica de edição inline
        // Exemplo: abrir ProductDetailsModal para edição
      }
    } catch (err) {
      setError("Erro ao executar ação");
    }
  };

  const handleViewDetails = (product: Product) => {
    setDetailsModal({ isOpen: true, product });
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
      {/* Header com estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total de Produtos</p>
                <p className="text-2xl font-bold">{totalProducts}</p>
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
                <p className="text-2xl font-bold text-yellow-600">
                  {pendingProducts}
                </p>
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
                <p className="text-2xl font-bold text-green-600">
                  {approvedProducts}
                </p>
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
                <p className="text-2xl font-bold text-red-600">
                  {rejectedProducts}
                </p>
              </div>
              <XCircle className="h-8 w-8 text-red-500" />
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

      {/* Lista de produtos */}
      <Card>
        <CardHeader>
          <CardTitle>Moderação de Produtos</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="p-8 text-center text-gray-500">
              Carregando produtos...
            </div>
          ) : error ? (
            <div className="p-8 text-center text-red-600">{error}</div>
          ) : (
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
                  {filteredProducts.map((product) => (
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
                      <td className="p-3">{product.vendor?.name}</td>
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
                          {new Date(product.createdAt).toLocaleDateString(
                            "pt-BR"
                          )}
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
                            <DropdownMenuItem
                              onClick={() => handleViewDetails(product)}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              Ver Detalhes
                            </DropdownMenuItem>
                            {product.status === "pending" && (
                              <>
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleAction("approve", product)
                                  }
                                  className="text-green-600"
                                >
                                  <Check className="h-4 w-4 mr-2" />
                                  Aprovar
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleAction("reject", product)
                                  }
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
          )}
        </CardContent>
      </Card>

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

      {/* Dialog de ações */}
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

      {/* Product Details Modal */}
      <ProductDetailsModal
        product={detailsModal.product || null}
        isOpen={detailsModal.isOpen}
        onClose={() => setDetailsModal({ isOpen: false })}
        onEdit={(product) => {
          console.log("Edit product:", product);
          setDetailsModal({ isOpen: false });
        }}
        onApprove={(product) => {
          console.log("Approve product:", product);
          setDetailsModal({ isOpen: false });
        }}
        onReject={(product) => {
          console.log("Reject product:", product);
          setDetailsModal({ isOpen: false });
        }}
        onDelete={(product) => {
          console.log("Delete product:", product);
          setDetailsModal({ isOpen: false });
        }}
      />
    </div>
  );
}
