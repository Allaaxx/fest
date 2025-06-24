import { NextResponse } from "next/server";
import { PrismaClient } from "@/lib/generated/prisma";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json(
        { error: "E-mail é obrigatório." },
        { status: 400 }
      );
    }
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json(
        { error: "Usuário não encontrado." },
        { status: 404 }
      );
    }
    // Gera um novo JWT temporário para validação de e-mail (expira em 15min)
    const tempToken = jwt.sign(
      {
        sub: user.id,
        email: user.email,
        type: "email-verify",
      },
      process.env.JWT_SECRET!,
      { expiresIn: "15m" }
    );
    return NextResponse.json({ token: tempToken });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao gerar token." },
      { status: 500 }
    );
  }
}
