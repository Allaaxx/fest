import { NextResponse } from "next/server";
import { PrismaClient } from "@/lib/generated/prisma";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { token, code } = await req.json();
    if (!token || !code) {
      return NextResponse.json(
        { error: "Token e código são obrigatórios.", debug: { token, code } },
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
    const user = await prisma.user.findUnique({ where: { id: payload.sub } });
    if (!user || user.validationToken !== code) {
      return NextResponse.json(
        { error: "Código inválido ou expirado." },
        { status: 400 }
      );
    }
    await prisma.user.update({
      where: { id: payload.sub },
      data: { emailVerified: new Date(), validationToken: null },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao validar conta." },
      { status: 500 }
    );
  }
}
