
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { Resend } from "resend";
import jwt from "jsonwebtoken";
import * as yup from "yup";
// Schema de validação para cadastro
const registerSchema = yup.object({
  name: yup.string().min(2, "Nome muito curto").max(50, "Nome muito longo").required("Nome é obrigatório"),
  email: yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
  password: yup
    .string()
    .required("Senha é obrigatória")
    .min(8, "A senha deve ter pelo menos 8 caracteres")
    .max(100, "Senha muito longa")
    .matches(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula")
    .matches(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
    .matches(/[0-9]/, "A senha deve conter pelo menos um número")
    .matches(/[^a-zA-Z0-9]/, "A senha deve conter pelo menos um caractere especial"),
  role: yup.string().oneOf(["CLIENTE", "ADMIN", "VENDEDOR"], "Tipo de usuário inválido").notRequired(),
});

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // Validação com Yup
    try {
      await registerSchema.validate(body, { abortEarly: false });
    } catch (err: any) {
      return NextResponse.json(
        { error: "Dados inválidos", details: err.errors },
        { status: 400 }
      );
    }
    const { name, email, password, role } = body;
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

    return NextResponse.json({ success: true, token: tempToken });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao registrar usuário." },
      { status: 500 }
    );
  }
}
