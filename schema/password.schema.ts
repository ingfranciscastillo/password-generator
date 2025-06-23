import { z } from "zod";

export const passwordSchema = z.object({
  title: z.string().trim().min(1, "El título es obligatorio"),
  password: z
    .string()
    .trim()
    .min(4, "La contraseña debe tener al menos 4 caracteres"),
  length: z.coerce
    .number()
    .min(4, "La longitud mínima es 4")
    .max(128, "La longitud máxima es 128")
    .optional(),
  hasUppercase: z.boolean().default(false).optional(),
  hasLowercase: z.boolean().default(false).optional(),
  hasNumbers: z.boolean().default(false).optional(),
  hasSpecialChars: z.boolean().default(false).optional(),
});

export type PasswordSchema = z.infer<typeof passwordSchema>;
