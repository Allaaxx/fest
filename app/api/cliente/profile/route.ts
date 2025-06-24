import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      id: true,
      name: true,
      surname: true,
      email: true,
      phone: true,
      address: true,
      cep: true,
      cpf: true,
      profileImage: true,
      createdAt: true,
    },
  });
  return NextResponse.json(user);
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }
  const data = await req.json();
  const user = await prisma.user.update({
    where: { email: session.user.email },
    data: {
      name: data.name,
      surname: data.surname,
      email: data.email,
      phone: data.phone,
      address: data.address,
      cep: data.cep,
      cpf: data.cpf,
      profileImage: data.profileImage,
    },
    select: {
      id: true,
      name: true,
      surname: true,
      email: true,
      phone: true,
      address: true,
      cep: true,
      cpf: true,
      profileImage: true,
      createdAt: true,
    },
  });
  return NextResponse.json(user);
}
