import Cryptr from "cryptr";

if (process.env.ENCRYPTION_KEY === undefined) {
  throw new Error("ENCRYPTION_KEY is not set in the environment variables");
}

export const cryptr = new Cryptr(process.env.ENCRYPTION_KEY);
