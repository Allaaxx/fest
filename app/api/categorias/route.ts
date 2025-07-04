import * as yup from "yup";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Schema de validação Yup para categoria
const categorySchema = yup.object().shape({
  name: yup.string().required("Nome da categoria é obrigatório"),
  slug: yup.string().required("Slug é obrigatório"),
  description: yup.string().nullable(),
  parentId: yup.string().nullable(),
});

// GET: lista todas as categorias
export async function GET() {
  try {
    const categorias = await prisma.category.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        parent: true,
        children: true,
      },
    });
    return new Response(JSON.stringify(categorias), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Erro ao buscar categorias" }), { status: 500 });
  }
}

// POST: cria uma nova categoria
export async function POST(request: Request) {
  try {
    const body = await request.json();
    try {
      await categorySchema.validate(body, { abortEarly: false });
    } catch (err: any) {
      return new Response(
        JSON.stringify({ error: "Dados inválidos", details: err.errors }),
        { status: 400 }
      );
    }
    const categoria = await prisma.category.create({
      data: {
        name: body.name,
        slug: body.slug,
        description: body.description,
        parentId: body.parentId ?? null,
      },
    });
    return new Response(JSON.stringify(categoria), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Erro ao criar categoria" }), { status: 500 });
  }
}
