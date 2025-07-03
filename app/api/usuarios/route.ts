// CRUD de usuários (coleção)
// GET: listar todos, POST: criar novo
export async function GET(request: Request) {
  return new Response(JSON.stringify({ message: "Listar usuários" }), {
    status: 200,
  });
}

export async function POST(request: Request) {
  return new Response(JSON.stringify({ message: "Criar usuário" }), {
    status: 201,
  });
}
