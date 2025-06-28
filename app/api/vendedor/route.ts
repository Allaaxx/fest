import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import * as yup from "yup";

// Schema de validação para cadastro de vendedor
const vendorSchema = yup.object({
  fullName: yup.string().required("Nome completo é obrigatório"),
  email: yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
  phone: yup.string().required("Telefone é obrigatório"),
  cpf: yup.string().required("CPF é obrigatório"),
  companyName: yup.string().required("Nome da empresa é obrigatório"),
  companyType: yup.string().required("Tipo de negócio é obrigatório"),
  description: yup.string().required("Descrição é obrigatória"),
  cep: yup.string().required("CEP é obrigatório"),
  address: yup.string().required("Endereço é obrigatório"),
  number: yup.string().required("Número é obrigatório"),
  neighborhood: yup.string().required("Bairro é obrigatório"),
  city: yup.string().required("Cidade é obrigatória"),
  state: yup.string().required("Estado é obrigatório"),
  bankName: yup.string().required("Banco é obrigatório"),
  accountType: yup.string().required("Tipo de conta é obrigatório"),
  agency: yup.string().required("Agência é obrigatória"),
  account: yup.string().required("Conta é obrigatória"),
  // Documentos: apenas checa se existe (nome do arquivo)
  rg: yup.string().required("RG ou CNH é obrigatório"),
  cpfDoc: yup.string().required("CPF é obrigatório"),
  comprovante: yup.string().required("Comprovante de residência é obrigatório"),
  acceptTerms: yup
    .boolean()
    .oneOf([true], "Você deve aceitar os termos de uso"),
  acceptCommission: yup
    .boolean()
    .oneOf([true], "Você deve aceitar a taxa de comissão"),
});

const prisma = new PrismaClient();

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }
  const data = await req.json();

  // Validação com Yup
  try {
    await vendorSchema.validate(data, { abortEarly: false });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Dados inválidos", details: err.errors },
      { status: 400 }
    );
  }

  // Atualiza role do usuário para VENDEDOR e salva todos os dados do formulário
  try {
    // Atualiza dados básicos do usuário
    const user = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        role: "VENDEDOR",
        name: data.fullName,
        phone: data.phone,
        cpf: data.cpf,
        address: data.address,
        cep: data.cep,
      },
    });

    // Upsert do perfil de vendedor
    await prisma.vendorProfile.upsert({
      where: { userId: user.id },
      update: {
        companyName: data.companyName,
        companyType: data.companyType,
        description: data.description,
        rg: data.rg,
        cpfDoc: data.cpfDoc,
        comprovante: data.comprovante,
        bankName: data.bankName,
        accountType: data.accountType,
        agency: data.agency,
        account: data.account,
        number: data.number,
        neighborhood: data.neighborhood,
        city: data.city,
        state: data.state,
      },
      create: {
        userId: user.id,
        companyName: data.companyName,
        companyType: data.companyType,
        description: data.description,
        rg: data.rg,
        cpfDoc: data.cpfDoc,
        comprovante: data.comprovante,
        bankName: data.bankName,
        accountType: data.accountType,
        agency: data.agency,
        account: data.account,
        number: data.number,
        neighborhood: data.neighborhood,
        city: data.city,
        state: data.state,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao atualizar perfil para vendedor" },
      { status: 500 }
    );
  }
}
