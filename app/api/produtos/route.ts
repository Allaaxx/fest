// CRUD de produtos (coleção)
// GET: listar todos, POST: criar novo

// Mock de produtos em memória (escopo do módulo)
let produtos: any[] = [
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
    rating: 4.7,
    totalReviews: 12,
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
    rating: 4.9,
    totalReviews: 22,
  },
];

export async function GET(request: Request) {
  // Retorna todos os produtos
  return new Response(JSON.stringify(produtos), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  const novoProduto = {
    ...body,
    id: String(Date.now()),
    createdAt: new Date().toISOString(),
  };
  produtos.push(novoProduto);
  return new Response(JSON.stringify(novoProduto), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
