
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export async function GET(request: Request) {
  // Busca todos os produtos com dados do vendedor (VendorProfile e User)
  try {
    const produtos = await prisma.product.findMany({
      include: {
        vendorProfile: {
          include: {
            user: true,
          },
        },
        category: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    // Mapeia para o formato esperado pelo frontend
    const mapped = produtos.map((p) => ({
      id: p.id,
      name: p.name,
      description: p.description,
      category: p.category
        ? {
            id: p.category.id,
            name: p.category.name,
            slug: p.category.slug,
          }
        : null,
      categoryId: p.categoryId,
      type: p.type,
      price: p.price,
      status: p.status,
      vendor: {
        name: p.vendorProfile.companyName,
        id: p.vendorProfile.id,
      },
      createdAt: p.createdAt,
      reviewedAt: p.reviewedAt,
      reviewedBy: p.reviewedBy,
      rejectionReason: p.rejectionReason,
      sales: p.sales,
      views: p.views,
      rating: p.rating,
      totalReviews: p.totalReviews,
    }));

    return new Response(JSON.stringify(mapped), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Erro ao buscar produtos' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Buscar categoria e validar allowedTypes
    const categoria = await prisma.category.findUnique({
      where: { id: body.categoryId },
      select: { allowedTypes: true, name: true },
    });
    if (!categoria) {
      return new Response(JSON.stringify({ error: 'Categoria não encontrada.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    if (!categoria.allowedTypes?.includes(body.type)) {
      return new Response(
        JSON.stringify({ error: `O tipo "${body.type}" não é permitido para a categoria "${categoria.name}".` }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    // Espera-se que o body contenha vendorProfileId
    const novoProduto = await prisma.product.create({
      data: {
        name: body.name,
        description: body.description,
        categoryId: body.categoryId,
        type: body.type,
        price: body.price,
        status: body.status || 'pending',
        vendorProfileId: body.vendorProfileId,
        reviewedAt: body.reviewedAt ? new Date(body.reviewedAt) : undefined,
        reviewedBy: body.reviewedBy,
        rejectionReason: body.rejectionReason,
        sales: body.sales || 0,
        views: body.views || 0,
        rating: body.rating || 0,
        totalReviews: body.totalReviews || 0,
      },
      include: {
        vendorProfile: {
          include: { user: true },
        },
        category: true,
      },
    });

    // Mapeia para o formato esperado pelo frontend
    const mapped = {
      id: novoProduto.id,
      name: novoProduto.name,
      description: novoProduto.description,
      category: novoProduto.category
        ? {
            id: novoProduto.category.id,
            name: novoProduto.category.name,
            slug: novoProduto.category.slug,
          }
        : null,
      categoryId: novoProduto.categoryId,
      type: novoProduto.type,
      price: novoProduto.price,
      status: novoProduto.status,
      vendor: {
        name: novoProduto.vendorProfile.companyName,
        id: novoProduto.vendorProfile.id,
      },
      createdAt: novoProduto.createdAt,
      reviewedAt: novoProduto.reviewedAt,
      reviewedBy: novoProduto.reviewedBy,
      rejectionReason: novoProduto.rejectionReason,
      sales: novoProduto.sales,
      views: novoProduto.views,
      rating: novoProduto.rating,
      totalReviews: novoProduto.totalReviews,
    };

    return new Response(JSON.stringify(mapped), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Erro ao criar produto' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
