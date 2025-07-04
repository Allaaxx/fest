import * as yup from "yup";
// Schema de validação Yup para produto (backend)
const productSchema = yup.object().shape({
  name: yup.string().required("Nome do produto é obrigatório"),
  description: yup.string().required("Descrição é obrigatória"),
  categoryId: yup.string().required("Categoria é obrigatória"),
  type: yup.string().oneOf(["venda", "locacao", "servico"], "Tipo inválido").required("Tipo é obrigatório"),
  price: yup
    .number()
    .typeError("Preço deve ser um número")
    .min(0, "Preço não pode ser negativo")
    .required("Preço é obrigatório"),
  vendorProfileId: yup.string().required("Vendedor é obrigatório"),
  features: yup.array().of(yup.string().required("Característica não pode ser vazia")),
});
// Operações em produto específico
// GET: obter, PUT: atualizar, DELETE: remover

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const produto = await prisma.product.findUnique({
      where: { id: params.id },
      include: {
        vendorProfile: {
          include: { user: true },
        },
        category: true,
      },
    });
    if (!produto) {
      return new Response(JSON.stringify({ error: "Produto não encontrado" }), {
        status: 404,
      });
    }
    const mapped = {
      id: produto.id,
      name: produto.name,
      description: produto.description,
      category: produto.category
        ? {
            id: produto.category.id,
            name: produto.category.name,
            slug: produto.category.slug,
          }
        : null,
      categoryId: produto.categoryId,
      type: produto.type,
      price: produto.price,
      status: produto.status,
      vendor: {
        name: produto.vendorProfile.companyName,
        id: produto.vendorProfile.id,
      },
      createdAt: produto.createdAt,
      reviewedAt: produto.reviewedAt,
      reviewedBy: produto.reviewedBy,
      rejectionReason: produto.rejectionReason,
      sales: produto.sales,
      views: produto.views,
      rating: produto.rating,
      totalReviews: produto.totalReviews,
    };
    return new Response(JSON.stringify(mapped), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Erro ao buscar produto" }), {
      status: 500,
    });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    // Validação com Yup
    try {
      await productSchema.validate(body, { abortEarly: false });
    } catch (err: any) {
      return new Response(
        JSON.stringify({ error: "Dados inválidos", details: err.errors }),
        { status: 400 }
      );
    }
    const produto = await prisma.product.update({
      where: { id: params.id },
      data: {
        name: body.name,
        description: body.description,
        categoryId: body.categoryId,
        type: body.type,
        price: body.price,
        status: body.status,
        vendorProfileId: body.vendorProfileId,
        reviewedAt: body.reviewedAt ? new Date(body.reviewedAt) : undefined,
        reviewedBy: body.reviewedBy,
        rejectionReason: body.rejectionReason,
        sales: body.sales,
        views: body.views,
        rating: body.rating,
        totalReviews: body.totalReviews,
      },
      include: {
        vendorProfile: {
          include: { user: true },
        },
        category: true,
      },
    });
    const mapped = {
      id: produto.id,
      name: produto.name,
      description: produto.description,
      category: produto.category
        ? {
            id: produto.category.id,
            name: produto.category.name,
            slug: produto.category.slug,
          }
        : null,
      categoryId: produto.categoryId,
      type: produto.type,
      price: produto.price,
      status: produto.status,
      vendor: {
        name: produto.vendorProfile.companyName,
        id: produto.vendorProfile.id,
      },
      createdAt: produto.createdAt,
      reviewedAt: produto.reviewedAt,
      reviewedBy: produto.reviewedBy,
      rejectionReason: produto.rejectionReason,
      sales: produto.sales,
      views: produto.views,
      rating: produto.rating,
      totalReviews: produto.totalReviews,
    };
    return new Response(JSON.stringify(mapped), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Erro ao atualizar produto" }),
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.product.delete({ where: { id: params.id } });
    return new Response(null, { status: 204 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Erro ao remover produto" }), {
      status: 500,
    });
  }
}
