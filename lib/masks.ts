export const phoneMask = (value: string): string => {
  // Remove tudo que não é dígito
  const numbers = value.replace(/\D/g, "")

  // Aplica a máscara baseada no tamanho
  if (numbers.length <= 10) {
    // Telefone fixo: (11) 1234-5678
    return numbers
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d)/, "$1-$2")
      .replace(/(-\d{4})\d+?$/, "$1")
  } else {
    // Celular: (11) 91234-5678
    return numbers
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{4})\d+?$/, "$1")
  }
}

export const cpfMask = (value: string): string => {
  // Remove tudo que não é dígito
  const numbers = value.replace(/\D/g, "")

  // Aplica a máscara: 123.456.789-01
  return numbers
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1")
}

export const cnpjMask = (value: string): string => {
  // Remove tudo que não é dígito
  const numbers = value.replace(/\D/g, "")

  // Aplica a máscara: 12.345.678/0001-90
  return numbers
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1")
}

export const cepMask = (value: string): string => {
  // Remove tudo que não é dígito
  const numbers = value.replace(/\D/g, "")

  // Aplica a máscara: 12345-678
  return numbers.replace(/(\d{5})(\d)/, "$1-$2").replace(/(-\d{3})\d+?$/, "$1")
}

export const currencyMask = (value: string): string => {
  // Remove tudo que não é dígito
  const numbers = value.replace(/\D/g, "")

  // Converte para formato de moeda
  const amount = Number.parseFloat(numbers) / 100

  return amount.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

// Função para remover máscaras (útil para envio de dados)
export const removeMask = (value: string): string => {
  return value.replace(/\D/g, "")
}

// Validações
export const isValidCPF = (cpf: string): boolean => {
  const numbers = removeMask(cpf)

  if (numbers.length !== 11) return false

  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1{10}$/.test(numbers)) return false

  // Validação do primeiro dígito verificador
  let sum = 0
  for (let i = 0; i < 9; i++) {
    sum += Number.parseInt(numbers.charAt(i)) * (10 - i)
  }
  let remainder = 11 - (sum % 11)
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== Number.parseInt(numbers.charAt(9))) return false

  // Validação do segundo dígito verificador
  sum = 0
  for (let i = 0; i < 10; i++) {
    sum += Number.parseInt(numbers.charAt(i)) * (11 - i)
  }
  remainder = 11 - (sum % 11)
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== Number.parseInt(numbers.charAt(10))) return false

  return true
}

export const isValidPhone = (phone: string): boolean => {
  const numbers = removeMask(phone)
  return numbers.length >= 10 && numbers.length <= 11
}

export const isValidCEP = (cep: string): boolean => {
  const numbers = removeMask(cep)
  return numbers.length === 8
}
