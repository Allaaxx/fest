
import { type NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { sendVerificationEmail } from "@/lib/email";
import jwt from "jsonwebtoken";
import * as yup from "yup";
// Schema de validação para o corpo da requisição
const tokenSchema = yup.object({
  token: yup.string().required("Token é obrigatório"),
});

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // Validação com Yup
    try {
      await tokenSchema.validate(body, { abortEarly: false });
    } catch (err: any) {
      return NextResponse.json(
        { error: "Dados inválidos", details: err.errors },
        { status: 400 }
      );
    }
    const { token } = body;
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
