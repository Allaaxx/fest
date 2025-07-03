// CRUD de categorias (coleção)
// GET: listar todas, POST: criar nova
export async function GET(request: Request) {
  return new Response(JSON.stringify({ message: "Listar categorias" }), {
    status: 200,
  });
}

export async function POST(request: Request) {
  return new Response(JSON.stringify({ message: "Criar categoria" }), {
    status: 201,
  });
}
