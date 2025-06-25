import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { getToken } from "next-auth/jwt";
import { cookies } from "next/headers";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Log seguro apenas para debug local (NÃO expõe secrets em produção)
if (process.env.NODE_ENV !== "production") {
  console.log("[UPLOAD] CLOUDINARY CONFIG OK");
}

export const runtime = "nodejs";

export async function POST(req: Request) {
  // Usa o req original para obter o token JWT
  let token;
  try {
    token = await getToken({ req: req as any });
  } catch (e) {
    console.error("[UPLOAD] Erro ao obter token JWT");
    return NextResponse.json(
      { error: "Erro ao obter token JWT" },
      { status: 500 }
    );
  }
  // Não loga mais o token em produção
  const userId = token?.sub || token?.id || token?.email || null;

  let formData, file, oldPublicId;
  try {
    formData = await req.formData();
    file = formData.get("file") as File;
    oldPublicId = formData.get("oldPublicId") as string | null;
  } catch (e) {
    console.error("[UPLOAD] Erro ao processar formData");
    return NextResponse.json(
      { error: "Erro ao processar formData" },
      { status: 500 }
    );
  }

  if (!file || !userId) {
    console.error("[UPLOAD] Token JWT ausente ou usuário não identificado");
    return NextResponse.json(
      { error: "Arquivo ou usuário não enviado" },
      { status: 400 }
    );
  }
  let buffer;
  try {
    const arrayBuffer = await file.arrayBuffer();
    buffer = Buffer.from(arrayBuffer);
  } catch (e) {
    console.error("[UPLOAD] Erro ao converter arquivo em buffer");
    return NextResponse.json(
      { error: "Erro ao processar arquivo" },
      { status: 500 }
    );
  }

  try {
    if (oldPublicId) {
      try {
        await cloudinary.uploader.destroy(oldPublicId);
      } catch (e) {
        // Não bloqueia o upload se falhar ao deletar
        console.error("[UPLOAD] Erro ao deletar imagem antiga do Cloudinary");
      }
    }
    // Loga apenas início do upload
    if (process.env.NODE_ENV !== "production") {
      console.log("[UPLOAD] Iniciando upload para Cloudinary", {
        userId,
        fileSize: buffer.length,
      });
    }
    const upload = await new Promise<any>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "profile",
          public_id: `profile_${userId}`,
          overwrite: true,
          resource_type: "image",
        },
        (err: any, result: any) => {
          if (err) {
            console.error("[UPLOAD] Erro no upload_stream");
            return reject(err);
          }
          if (process.env.NODE_ENV !== "production") {
            console.log("[UPLOAD] Resultado do upload");
          }
          resolve(result);
        }
      );
      stream.end(buffer);
    });
    return NextResponse.json({
      url: upload.secure_url,
      public_id: upload.public_id,
    });
  } catch (e) {
    console.error("[UPLOAD] Erro ao fazer upload");
    return NextResponse.json(
      {
        error: "Erro ao fazer upload",
      },
      { status: 500 }
    );
  }
}
