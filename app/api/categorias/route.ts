import * as yup from "yup";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
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
    return new Response(
      JSON.stringify({ error: "Erro ao buscar categorias" }),
      { status: 500 }
    );
  }
}

// POST: cria uma nova categoria
export async function POST(request: Request) {
  try {
    const body = await request.json();
    try {
      await categorySchema.validate(body, { abortEarly: false });
    } catch (err: any) {
      return NextResponse.json(
        { error: "Dados inválidos", details: err.errors },
        { status: 400 }
      );
    }
    try {
      const categoria = await prisma.category.create({
        data: {
          name: body.name,
          slug: body.slug,
          description: body.description,
          status: body.status || "active",
          parentId: body.parentId ?? null,
          allowedTypes: body.allowedTypes as any, // for prisma string[]
        },
      });
      return NextResponse.json(
        { success: true, message: "Categoria criada com sucesso!", categoria },
        { status: 201 }
      );
    } catch (prismaError: any) {
      // Prisma erro de unicidade (slug ou name)
      if (prismaError.code === "P2002") {
        let field = "slug";
        if (prismaError.meta?.target?.includes("name")) field = "nome";
        return NextResponse.json(
          { error: `Já existe uma categoria com esse ${field}.` },
          { status: 409 }
        );
      }
      // Prisma erro de violação de constraint customizada
      if (
        prismaError.message?.includes("unique constraint") &&
        prismaError.message?.includes("name")
      ) {
        return NextResponse.json(
          { error: "Já existe uma categoria com esse nome." },
          { status: 409 }
        );
      }
      // Erro genérico
      return NextResponse.json(
        {
          error: "Erro ao criar categoria",
          details:
            prismaError instanceof Error ? prismaError.message : prismaError,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Erro ao criar categoria:", error);
    return new Response(
      JSON.stringify({
        error: "Erro ao criar categoria",
        details: error instanceof Error ? error.message : error,
      }),
      { status: 500 }
    );
  }
}
