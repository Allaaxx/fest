import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { getToken } from "next-auth/jwt";
import { cookies } from "next/headers";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const runtime = "nodejs";

export async function POST(req: Request) {
  // Usa o req original para obter o token JWT
  const token = await getToken({ req });
  console.log("TOKEN JWT:", token);
  const userId = token?.sub || token?.id || token?.email || null;

  const formData = await req.formData();
  const file = formData.get("file") as File;
  const oldPublicId = formData.get("oldPublicId") as string | null;

  if (!file || !userId) {
    console.error("Token JWT ausente ou usuário não identificado", { token, userId });
    return NextResponse.json(
      { error: "Arquivo ou usuário não enviado" },
      { status: 400 }
    );
  }
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  try {
    if (oldPublicId) {
      try {
        await cloudinary.uploader.destroy(oldPublicId);
      } catch (e) {
        // Não bloqueia o upload se falhar ao deletar
      }
    }
    const upload = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "profile",
            public_id: `profile_${userId}`,
            overwrite: true,
            resource_type: "image",
          },
          (err: any, result: any) => {
            if (err) return reject(err);
            resolve(result);
          }
        )
        .end(buffer);
    });
    return NextResponse.json({
      url: upload.secure_url,
      public_id: upload.public_id,
    });
  } catch (e) {
    return NextResponse.json(
      { error: "Erro ao fazer upload" },
      { status: 500 }
    );
  }
}
