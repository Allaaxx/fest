import * as yup from "yup";

export const credentialsSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

export function validateCredentials(credentials: any) {
  return credentialsSchema.validate(credentials);
}
