import React, { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function CategoryAutocomplete({
  categories,
  value,
  onChange,
  loading,
  error,
}: {
  categories: { id: string; name: string }[];
  value: string;
  onChange: (id: string) => void;
  loading?: boolean;
  error?: string | null;
}) {
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const selected = categories.find((c) => c.id === value);
  const filtered =
    search.length > 0
      ? categories.filter((c) =>
          c.name.toLowerCase().includes(search.toLowerCase())
        )
      : categories;
  const inputValue = show ? search : selected ? selected.name : search;

  return (
    <div className="relative w-full min-w-0">
      <div className="flex items-center border rounded-lg shadow-sm bg-white transition-all w-full min-w-0">
        <Input
          ref={inputRef}
          autoComplete="off"
          placeholder={loading ? "Carregando categorias..." : error ? error : "Busque por categoria..."}
          value={inputValue}
          onChange={e => {
            setSearch(e.target.value);
            setShow(true);
            if (e.target.value === "") onChange("");
          }}
          onFocus={() => setShow(true)}
          disabled={loading}
          required
          className="flex-1 border-0 bg-transparent focus:ring-0 focus:outline-none px-3 py-2 text-base placeholder-gray-400 w-full min-w-0"
        />
        {selected && !show && !loading && (
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="mr-2 text-gray-400 hover:text-red-600"
            title="Limpar seleção"
            tabIndex={-1}
            onClick={() => {
              onChange("");
              setSearch("");
              setShow(true);
              setTimeout(() => inputRef.current?.focus(), 100);
            }}
          >
            ×
          </Button>
        )}
      </div>
      {show && !loading && (
        <div className="absolute z-10 bg-white border rounded-lg w-full max-h-56 overflow-y-auto shadow-xl mt-1 left-0 animate-fade-in">
          {filtered.length === 0 && (
            <div className="p-3 text-gray-500 text-center">Nenhuma categoria encontrada</div>
          )}
          {filtered.map(cat => (
            <div
              key={cat.id}
              className={`px-4 py-2 cursor-pointer hover:bg-[#f0739f]/10 transition-colors rounded ${cat.id === value ? "bg-[#f0739f]/20 font-semibold" : ""}`}
              onClick={() => {
                onChange(cat.id);
                setSearch(cat.name);
                setShow(false);
                setTimeout(() => inputRef.current?.blur(), 100);
              }}
            >
              <span className="truncate block">{cat.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
