
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import * as yup from "yup";
// Schema de validação para o corpo da requisição
const emailSchema = yup.object({
  email: yup.string().email("E-mail inválido").required("E-mail é obrigatório."),
});

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // Validação com Yup
    try {
      await emailSchema.validate(body, { abortEarly: false });
    } catch (err: any) {
      return NextResponse.json(
        { error: "Dados inválidos", details: err.errors },
        { status: 400 }
      );
    }
    const { email } = body;
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
