import * as yup from "yup";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Schema de validação Yup para categoria
const categorySchema = yup.object().shape({
  name: yup.string().required("Nome da categoria é obrigatório"),
  slug: yup.string().required("Slug é obrigatório"),
  description: yup.string().nullable(),
  status: yup.string().oneOf(["active", "inactive"]).default("active"),
  parentId: yup.string().nullable(),
});

// GET: retorna uma categoria específica
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const categoria = await prisma.category.findUnique({
      where: { id: params.id },
      include: {
        parent: true,
        children: true,
      },
    });
    if (!categoria) {
      return new Response(JSON.stringify({ error: "Categoria não encontrada" }), { status: 404 });
    }
    return new Response(JSON.stringify(categoria), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Erro ao buscar categoria" }), { status: 500 });
  }
}

// PUT: atualiza uma categoria
export async function PUT(request: Request, { params }: { params: { id: string } }) {
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
    try {
      const categoria = await prisma.category.update({
        where: { id: params.id },
        data: {
          name: body.name,
          slug: body.slug,
          description: body.description,
          status: body.status || "active",
          parentId: body.parentId ?? null,
        },
      });
      return new Response(
        JSON.stringify({ success: true, message: "Categoria atualizada com sucesso!", categoria }),
        { status: 200 }
      );
    } catch (prismaError: any) {
      // Prisma erro de unicidade (slug ou name)
      if (prismaError.code === 'P2002') {
        let field = 'slug';
        if (prismaError.meta?.target?.includes('name')) field = 'nome';
        return new Response(
          JSON.stringify({ error: `Já existe uma categoria com esse ${field}.` }),
          { status: 409 }
        );
      }
      // Prisma erro de violação de constraint customizada
      if (prismaError.message?.includes('unique constraint') && prismaError.message?.includes('name')) {
        return new Response(
          JSON.stringify({ error: "Já existe uma categoria com esse nome." }),
          { status: 409 }
        );
      }
      // Erro genérico
      return new Response(
        JSON.stringify({ error: "Erro ao atualizar categoria", details: prismaError instanceof Error ? prismaError.message : prismaError }),
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Erro ao atualizar categoria:", error);
    return new Response(
      JSON.stringify({ error: "Erro ao atualizar categoria", details: error instanceof Error ? error.message : error }),
      { status: 500 }
    );
  }
}

// DELETE: remove uma categoria
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.category.delete({ where: { id: params.id } });
    return new Response(null, { status: 204 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Erro ao remover categoria" }), { status: 500 });
  }
}
