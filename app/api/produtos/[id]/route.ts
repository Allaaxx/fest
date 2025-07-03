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
      category: produto.category,
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
    const produto = await prisma.product.update({
      where: { id: params.id },
      data: {
        name: body.name,
        description: body.description,
        category: body.category,
        type: body.type,
        price: body.price,
        status: body.status,
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
      },
    });
    const mapped = {
      id: produto.id,
      name: produto.name,
      description: produto.description,
      category: produto.category,
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
