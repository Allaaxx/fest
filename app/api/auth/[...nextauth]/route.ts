import NextAuth, { type NextAuthOptions } from "next-auth";
import * as yup from "yup";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import GithubProvider from "next-auth/providers/github";
import LinkedinProvider from "next-auth/providers/linkedin";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import type { Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";
import jwt from "jsonwebtoken";
import { sendVerificationEmail } from "@/lib/email";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        // Validação com Yup
        const schema = yup.object({
          email: yup.string().email().required(),
          password: yup.string().min(6).required(),
        });
        try {
          await schema.validate(credentials);
        } catch (err: any) {
          // Retorna erro customizado para o frontend identificar erro de validação
          const error = new Error("VALIDATION_ERROR");
          (error as any).details = err.errors || [err.message];
          throw error;
        }

        if (!credentials?.email || !credentials?.password) {
          const error = new Error("CREDENCIAIS_INVALIDAS");
          throw error;
        }
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user) {
          const error = new Error("EMAIL_NAO_ENCONTRADO");
          throw error;
        }
        const senhaCorreta = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!senhaCorreta) {
          const error = new Error("SENHA_INCORRETA");
          throw error;
        }

        // Se o e-mail não está verificado, força fluxo de validação
        if (!user.emailVerified) {
          const code2fa = Math.floor(
            100000 + Math.random() * 900000
          ).toString();
          await prisma.user.update({
            where: { email: credentials.email },
            data: { validationToken: code2fa },
          });
          await sendVerificationEmail(user.email, code2fa);
          const tempToken = jwt.sign(
            {
              sub: user.id,
              email: user.email,
              type: "email-verify",
            },
            process.env.NEXTAUTH_SECRET!,
            { expiresIn: "15m" }
          );
          const error = new Error("2FA_REQUIRED");
          (error as any).token = tempToken;
          throw error;
        }

        // Se já está verificado, permite login normal
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          image: user.profileImage,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    LinkedinProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID!,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
    }),
  ],
  session: { strategy: "jwt" as const },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User | any }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        // Garante que a imagem propagada para o token seja sempre a URL real do Cloudinary
        token.image = user.image || user.profileImage || "";
      } else if (!token.role) {
        delete token.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.role) {
        (session.user as any).role = token.role;
      } else if ((session.user as any)?.role) {
        delete (session.user as any).role;
      }
      // Garante que a imagem na sessão seja sempre a URL real do Cloudinary
      if (session.user) {
        session.user.image = typeof token.image === "string" ? token.image : "";
      }
      return session;
    },
  },
  pages: {
    signIn: "/autenticar",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
