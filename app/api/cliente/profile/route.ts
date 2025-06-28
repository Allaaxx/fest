
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import * as yup from "yup";
// Schema de validação para atualização de perfil
const profileSchema = yup.object({
  name: yup
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(50, "Nome muito longo")
    .required("Nome é obrigatório"),
  surname: yup
    .string()
    .min(2, "Sobrenome deve ter pelo menos 2 caracteres")
    .max(50, "Sobrenome muito longo")
    .required("Sobrenome é obrigatório"),
  email: yup
    .string()
    .email("E-mail inválido")
    .required("E-mail é obrigatório"),
  phone: yup
    .string()
    .min(8, "Telefone deve ter pelo menos 8 dígitos")
    .max(20, "Telefone muito longo")
    .required("Telefone é obrigatório"),
  address: yup
    .string()
    .min(3, "Endereço muito curto")
    .max(100, "Endereço muito longo")
    .required("Endereço é obrigatório"),
  cep: yup
    .string()
    .min(8, "CEP deve ter pelo menos 8 dígitos")
    .max(10, "CEP muito longo")
    .required("CEP é obrigatório"),
  cpf: yup
    .string()
    .min(11, "CPF deve ter pelo menos 11 dígitos")
    .max(14, "CPF muito longo")
    .required("CPF é obrigatório"),
  profileImage: yup.string().url("URL da imagem inválida").nullable().notRequired(),
});

const prisma = new PrismaClient();

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      id: true,
      name: true,
      surname: true,
      email: true,
      phone: true,
      address: true,
      cep: true,
      cpf: true,
      profileImage: true,
      createdAt: true,
    },
  });
  return NextResponse.json(user);
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }
  const data = await req.json();

  // Validação com Yup
  try {
    await profileSchema.validate(data, { abortEarly: false });
  } catch (err: any) {
    return NextResponse.json({ error: "Dados inválidos", details: err.errors }, { status: 400 });
  }

  const user = await prisma.user.update({
    where: { email: session.user.email },
    data: {
      name: data.name,
      surname: data.surname,
      email: data.email,
      phone: data.phone,
      address: data.address,
      cep: data.cep,
      cpf: data.cpf,
      profileImage: data.profileImage,
    },
    select: {
      id: true,
      name: true,
      surname: true,
      email: true,
      phone: true,
      address: true,
      cep: true,
      cpf: true,
      profileImage: true,
      createdAt: true,
    },
  });
  return NextResponse.json(user);
}
