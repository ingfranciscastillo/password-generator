"use server";

import { cryptr } from "@/lib/encrypt";
import prisma from "@/lib/prisma";

export const getPasswordAction = async () => {
  const passwords = await prisma.password.findMany();

  return passwords.map((item) => ({
    ...item,
    descryptedPassword: cryptr.decrypt(item.encryptedPassword),
  }));
};
