import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

/**
 * Hashes a password using BCrypt
 * @param password The password string.
 * @returns Hashed password.
 */
export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

/**
 * Compares a string with the hashed password.
 * @param password The password string.
 * @param hashedPassword Hashed password.
 * @returns true if the passwords match, false if not.
 */
export const verifyPassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};
