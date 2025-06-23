interface PasswordOptions {
  hasUppercase?: boolean;
  hasLowercase?: boolean;
  hasNumbers?: boolean;
  hasSpecialChars?: boolean;
  length?: number;
}

export const generatePassword = ({
  hasLowercase = true,
  hasNumbers = false,
  hasSpecialChars = false,
  hasUppercase = false,
  length = 12,
}: PasswordOptions = {}) => {
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const numberChars = "0123456789";
  const specialChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  let passwordChars = "";

  if (hasUppercase) passwordChars += uppercaseChars;
  if (hasLowercase) passwordChars += lowercaseChars;
  if (hasNumbers) passwordChars += numberChars;
  if (hasSpecialChars) passwordChars += specialChars;

  if (passwordChars.length === 0) {
    throw new Error("At least one character type must be selected.");
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * passwordChars.length);
    password += passwordChars[randomIndex];
  }

  return password;
};
