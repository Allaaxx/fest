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
  allowedTypes: yup
    .array()
    .of(yup.string().oneOf(["venda", "locacao", "servico"]))
    .min(1, "Selecione pelo menos um tipo permitido."),
});

// GET: retorna uma categoria específica
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const categoria = await prisma.category.findUnique({
      where: { id: params.id },
      include: {
        parent: true,
        children: true,
      },
    });
    if (!categoria) {
      return new Response(
        JSON.stringify({ error: "Categoria não encontrada" }),
        { status: 404 }
      );
    }
    // Garante que allowedTypes sempre seja array
    const categoriaComAllowedTypes = {
      ...categoria,
      allowedTypes: Array.isArray(categoria?.allowedTypes)
        ? categoria.allowedTypes
        : [],
    };
    return new Response(JSON.stringify(categoriaComAllowedTypes), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Erro ao buscar categoria" }), {
      status: 500,
    });
  }
}

// PUT: atualiza uma categoria
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    // Garante que allowedTypes seja sempre array de string
    let allowedTypes: string[] = [];
    if (Array.isArray(body.allowedTypes)) {
      allowedTypes = body.allowedTypes.map((t: any) => String(t));
    } else if (typeof body.allowedTypes === "string") {
      allowedTypes = [body.allowedTypes];
    }
    const dataToUpdate = {
      name: body.name,
      slug: body.slug,
      description: body.description,
      status: body.status || "active",
      parentId: body.parentId ?? null,
      allowedTypes,
    };
    try {
      await categorySchema.validate(
        { ...body, allowedTypes },
        { abortEarly: false }
      );
    } catch (err: any) {
      return new Response(
        JSON.stringify({ error: "Dados inválidos", details: err.errors }),
        { status: 400 }
      );
    }
    try {
      const categoria = await prisma.category.update({
        where: { id: params.id },
        data: dataToUpdate,
      });
      // Garante que allowedTypes seja array no retorno
      const categoriaComAllowedTypes = {
        ...categoria,
        allowedTypes: Array.isArray(categoria.allowedTypes)
          ? categoria.allowedTypes
          : [],
      };
      return new Response(
        JSON.stringify({
          success: true,
          message: "Categoria atualizada com sucesso!",
          categoria: categoriaComAllowedTypes,
        }),
        { status: 200 }
      );
    } catch (prismaError: any) {
      // Prisma erro de unicidade (slug ou name)
      if (prismaError.code === "P2002") {
        let field = "slug";
        if (prismaError.meta?.target?.includes("name")) field = "nome";
        return new Response(
          JSON.stringify({
            error: `Já existe uma categoria com esse ${field}.`,
          }),
          { status: 409 }
        );
      }
      // Prisma erro de violação de constraint customizada
      if (
        prismaError.message?.includes("unique constraint") &&
        prismaError.message?.includes("name")
      ) {
        return new Response(
          JSON.stringify({ error: "Já existe uma categoria com esse nome." }),
          { status: 409 }
        );
      }
      // Erro genérico
      return new Response(
        JSON.stringify({
          error: "Erro ao atualizar categoria",
          details:
            prismaError instanceof Error ? prismaError.message : prismaError,
        }),
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Erro ao atualizar categoria:", error);
    return new Response(
      JSON.stringify({
        error: "Erro ao atualizar categoria",
        details: error instanceof Error ? error.message : error,
      }),
      { status: 500 }
    );
  }
}

// DELETE: remove uma categoria
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.category.delete({ where: { id: params.id } });
    return new Response(null, { status: 204 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Erro ao remover categoria" }),
      { status: 500 }
    );
  }
}
