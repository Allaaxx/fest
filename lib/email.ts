// lib/email.ts
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

/**
 * Envia um e-mail de verificação para o usuário.
 * Substitua por integração real com serviço de e-mail em produção (ex: Resend, SendGrid, SES, etc).
 */
export async function sendVerificationEmail(email: string, htmlOrCode: string) {
  try {
    const result = await resend.emails.send({
      from: "Marketplace Fest <onboarding@resend.dev>",
      to: email,
      subject: htmlOrCode.startsWith("<")
        ? "Recuperação de senha - Marketplace Fest"
        : "Seu código de verificação",
      html: htmlOrCode.startsWith("<")
        ? htmlOrCode
        : `<p>Seu código de verificação é: <b>${htmlOrCode}</b></p>`,
    });
    console.log("[Resend] Email enviado:", result);
    return result;
  } catch (err) {
    console.error("[Resend] Erro ao enviar email:", err);
    throw err;
  }
}
