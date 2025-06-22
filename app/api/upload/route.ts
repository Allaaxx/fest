import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const runtime = "nodejs";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  if (!file) {
    return NextResponse.json({ error: "Arquivo não enviado" }, { status: 400 });
  }
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  try {
    const upload = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader.upload_stream({ folder: "profile" }, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }).end(buffer);
    });
    return NextResponse.json({ url: upload.secure_url });
  } catch (e) {
    return NextResponse.json({ error: "Erro ao fazer upload" }, { status: 500 });
  }
}
