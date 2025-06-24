"use server";
import { cryptr } from "@/lib/encrypt";
import prisma from "@/lib/prisma";
import { passwordSchema, PasswordSchema } from "@/schema/password.schema";

export const CreatePasswordAction = async (newPassword: PasswordSchema) => {
  const parseBody = passwordSchema.safeParse(newPassword);

  if (!parseBody.success) {
    return {
      success: false,
      error: parseBody.error.issues.map((issue) => issue.message).join(", "),
    };
  }

  const {
    password,
    title,
    hasLowercase,
    hasNumbers,
    hasSpecialChars,
    hasUppercase,
    length,
  } = parseBody.data;

  const encryptedPassword = cryptr.encrypt(password);

  return await prisma.password.create({
    data: {
      title,
      encryptedPassword: encryptedPassword,
      hasLowercase,
      hasNumbers,
      hasSpecialChars,
      hasUppercase,
      length,
    },
  });
};
