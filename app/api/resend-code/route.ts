import { type NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/lib/generated/prisma";
import { sendVerificationEmail } from "@/lib/email";
import { Prisma } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();
    if (!token) {
      return NextResponse.json(
        { error: "Token é obrigatório" },
        { status: 400 }
      );
    }
    let payload: any;
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET!);
    } catch (err) {
      return NextResponse.json(
        { error: "Token inválido ou expirado." },
        { status: 401 }
      );
    }
    if (!payload || payload.type !== "email-verify" || !payload.sub) {
      return NextResponse.json({ error: "Token inválido." }, { status: 401 });
    }
    // Verificar se o usuário existe
    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
    });
    if (!user) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }
    if (user.emailVerified) {
      return NextResponse.json(
        { error: "Esta conta já foi verificada" },
        { status: 400 }
      );
    }
    // Gerar novo código de verificação
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    const nowInSaoPaulo = new Date(
      new Date().toLocaleString("en-US", { timeZone: "America/Sao_Paulo" })
    );
    await prisma.user.update({
      where: { id: payload.sub },
      data: {
        validationToken: verificationCode,
        updatedAt: nowInSaoPaulo,
      },
    });
    await sendVerificationEmail(user.email, verificationCode);
    return NextResponse.json(
      { message: "Novo código de verificação enviado" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao reenviar código:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
