import { NextResponse } from "next/server";
import { PrismaClient } from "@/lib/generated/prisma";
import bcrypt from "bcryptjs";
import { Resend } from "resend";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, password, role } = await req.json();
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email e senha são obrigatórios." },
        { status: 400 }
      );
    }
    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) {
      return NextResponse.json(
        { error: "Já existe uma conta cadastrada com este e-mail." },
        { status: 409 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role || "CLIENTE",
      },
    });

    // Envia e-mail de boas-vindas/validação
    await resend.emails.send({
      from: "Marketplace Fest <onboarding@resend.dev>", // Domínio autorizado pela Resend
      to: email,
      subject: "Bem-vindo ao Marketplace Fest!",
      html: `<h2>Olá, ${name || email}!</h2><p>Seu cadastro foi realizado com sucesso.</p>`,
    });

    // Gera código de validação de 6 dígitos
    const validationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    // Salva o código no banco para validação posterior
    await prisma.user.update({
      where: { email },
      data: { emailVerified: null, validationToken: validationCode },
    });
    await resend.emails.send({
      from: "Marketplace Fest <onboarding@resend.dev>",
      to: email,
      subject: "Confirme seu cadastro no Marketplace Fest!",
      html: `<h2>Olá, ${name || email}!</h2>
        <p>Seu código de validação é:</p>
        <h3 style='font-size:2rem;letter-spacing:0.2em;'>${validationCode}</h3>
        <p>Se não foi você, ignore este e-mail.</p>`,
    });

    // Gera um JWT temporário para validação de e-mail (expira em 15min)
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
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao registrar usuário." },
      { status: 500 }
    );
  }
}
