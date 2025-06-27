
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import * as yup from "yup";
// Schema de validação para validação de conta
const validateSchema = yup.object({
  token: yup.string().required("Token é obrigatório."),
  code: yup.string().required("Código é obrigatório."),
});

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // Validação com Yup
    try {
      await validateSchema.validate(body, { abortEarly: false });
    } catch (err: any) {
      return NextResponse.json(
        { error: "Dados inválidos", details: err.errors },
        { status: 400 }
      );
    }
    const { token, code } = body;
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
    const user = await prisma.user.findUnique({ where: { id: payload.sub } });
    if (!user || user.validationToken !== code) {
      return NextResponse.json(
        { error: "Código inválido ou expirado." },
        { status: 400 }
      );
    }
    await prisma.user.update({
      where: { id: payload.sub },
      data: {
        emailVerified: new Date(
          new Date().toLocaleString("en-US", { timeZone: "America/Sao_Paulo" })
        ),
        validationToken: null,
      },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao validar conta." },
      { status: 500 }
    );
  }
}
