"use client";
import dynamic from "next/dynamic";

const ValidarCodigoComponent = dynamic(
  () => import("./ValidarCodigoComponent"),
  { ssr: false }
);

export default function Page() {
  return <ValidarCodigoComponent />;
}
