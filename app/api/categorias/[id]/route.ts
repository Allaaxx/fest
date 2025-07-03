// Operações em categoria específica
// GET: obter, PUT: atualizar, DELETE: remover
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  return new Response(
    JSON.stringify({ message: `Obter categoria ${params.id}` }),
    { status: 200 }
  );
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  return new Response(
    JSON.stringify({ message: `Atualizar categoria ${params.id}` }),
    { status: 200 }
  );
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  return new Response(
    JSON.stringify({ message: `Remover categoria ${params.id}` }),
    { status: 200 }
  );
}
