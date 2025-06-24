import NextAuth, { type NextAuthOptions } from "next-auth";
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
        if (!credentials?.email || !credentials?.password) return null;
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user) return null;
        const senhaCorreta = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!senhaCorreta) return null;

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
        token.id = user.id; // Garante que o id do usuário esteja no token JWT
        token.role = user.role;
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
      return session;
    },
  },
  pages: {
    signIn: "/autenticar",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
