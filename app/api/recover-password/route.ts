import { NextResponse } from "next/server";
import { PrismaClient } from "@/lib/generated/prisma";
import { sendVerificationEmail } from "@/lib/email";

const prisma = new PrismaClient();

async function sendPasswordResetEmail(email: string, token: string) {
  const url = `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/redefinir-senha?token=${token}`;
  await sendVerificationEmail(
    email,
    `<p>Para redefinir sua senha, clique no link abaixo:</p><p><a href='${url}'>Redefinir senha</a></p><p>Se não solicitou, ignore este e-mail.</p>`
  );
}

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email é obrigatório" },
        { status: 400 }
      );
    }

    // Verificar se o usuário existe
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Por segurança, não informamos que o usuário não existe
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // Impede reenvio se já foi enviado há menos de 2 minutos
    if (user.resetTokenExpires && user.resetToken) {
      const diff = (user.resetTokenExpires.getTime() - Date.now()) / 1000;
      if (diff > 0 && diff > 60 * 60 - 120) {
        // menos de 2 minutos desde o último envio
        return NextResponse.json(
          {
            error:
              "Aguarde alguns minutos antes de reenviar o e-mail de recuperação.",
          },
          { status: 429 }
        );
      }
    }

    // Gerar token de recuperação de senha
    const resetToken = crypto.randomUUID();
    const resetTokenExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hora

    // Atualizar o usuário com o token
    await prisma.user.update({
      where: { email },
      data: {
        resetToken,
        resetTokenExpires,
      },
    });

    // Enviar email com o link de recuperação
    await sendPasswordResetEmail(email, resetToken);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Erro ao processar recuperação de senha:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
