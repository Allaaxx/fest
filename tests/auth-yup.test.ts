import { validateCredentials } from "@/lib/validateCredentials";

describe("validateCredentials (Yup)", () => {
  it("retorna erro se email for inválido", async () => {
    await expect(
      validateCredentials({ email: "invalido", password: "123456" })
    ).rejects.toThrow();
  });

  it("retorna erro se senha for curta", async () => {
    await expect(
      validateCredentials({ email: "allan@email.com", password: "123" })
    ).rejects.toThrow();
  });

  it("valida credenciais corretas", async () => {
    await expect(
      validateCredentials({ email: "allan@email.com", password: "123456" })
    ).resolves.toEqual({ email: "allan@email.com", password: "123456" });
  });
});

describe("validateCredentials (Yup)", () => {
  it("retorna erro se email for inválido", async () => {
    await expect(
      validateCredentials({ email: "invalido", password: "123456" })
    ).rejects.toThrow();
  });

  it("retorna erro se senha for curta", async () => {
    await expect(
      validateCredentials({ email: "a@a.com", password: "123" })
    ).rejects.toThrow();
  });

  it("passa se dados forem válidos", async () => {
    await expect(
      validateCredentials({ email: "a@a.com", password: "123456" })
    ).resolves.toBeTruthy();
  });
});
