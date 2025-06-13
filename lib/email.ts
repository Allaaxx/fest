// lib/email.ts
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

/**
 * Envia um e-mail de verificação para o usuário.
 * Substitua por integração real com serviço de e-mail em produção (ex: Resend, SendGrid, SES, etc).
 */
export async function sendVerificationEmail(email: string, code: string) {
  await resend.emails.send({
    from: "Marketplace Fest <onboarding@resend.dev>", 
    to: email,
    subject: "Seu código de verificação",
    html: `<p>Seu código de verificação é: <b>${code}</b></p>`,
  });
}
