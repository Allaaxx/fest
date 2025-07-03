// Operações em produto específico
// GET: obter, PUT: atualizar, DELETE: remover
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  return new Response(
    JSON.stringify({ message: `Obter produto ${params.id}` }),
    { status: 200 }
  );
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  return new Response(
    JSON.stringify({ message: `Atualizar produto ${params.id}` }),
    { status: 200 }
  );
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  return new Response(
    JSON.stringify({ message: `Remover produto ${params.id}` }),
    { status: 200 }
  );
}
