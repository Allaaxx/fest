import React, { useRef } from "react";

interface OtpInputsProps {
  value: string;
  onChange: (val: string) => void;
  length?: number;
}

export default function OtpInputs({
  value,
  onChange,
  length = 6,
}: OtpInputsProps) {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const val = e.target.value.replace(/\D/g, "");
    if (!val) {
      // Se apagar, limpa o dígito atual e foca o anterior
      const newValue = value.substring(0, idx) + "" + value.substring(idx + 1);
      onChange(newValue);
      if (idx > 0) inputsRef.current[idx - 1]?.focus();
      return;
    }
    const newValue =
      value.substring(0, idx) + val[val.length - 1] + value.substring(idx + 1);
    onChange(newValue);
    if (val && idx < length - 1) {
      inputsRef.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    idx: number
  ) => {
    if (e.key === "Backspace") {
      if (value[idx]) {
        // Apaga o dígito atual
        const newValue =
          value.substring(0, idx) + "" + value.substring(idx + 1);
        onChange(newValue);
      } else if (idx > 0) {
        // Se já está vazio, foca o anterior
        inputsRef.current[idx - 1]?.focus();
        const newValue =
          value.substring(0, idx - 1) + "" + value.substring(idx);
        onChange(newValue);
      }
      e.preventDefault();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData
      .getData("Text")
      .replace(/\D/g, "")
      .slice(0, length);
    if (pasted) {
      onChange(pasted.padEnd(length, ""));
      // Foca o último input preenchido
      setTimeout(() => {
        const lastIdx = Math.min(pasted.length, length - 1);
        inputsRef.current[lastIdx]?.focus();
      }, 0);
    }
    e.preventDefault();
  };

  return (
    <div className="flex gap-3 justify-center w-full flex-wrap sm:flex-nowrap animate-fade-in">
      {Array.from({ length }).map((_, idx) => (
        <input
          key={idx}
          ref={(el) => {
            inputsRef.current[idx] = el || null;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          className="w-9 h-9 sm:w-14 sm:h-14 text-center text-xl sm:text-2xl font-bold bg-white border-2 border-fest-primary/40 focus:border-fest-primary focus:ring-2 focus:ring-fest-primary/30 rounded-xl shadow-sm transition-all duration-200 outline-none placeholder:text-gray-300"
          value={value[idx] || ""}
          onChange={(e) => handleChange(e, idx)}
          onKeyDown={(e) => handleKeyDown(e, idx)}
          onPaste={handlePaste}
          autoFocus={idx === 0}
          aria-label={`Dígito ${idx + 1} do código de verificação`}
        />
      ))}
    </div>
  );
}
