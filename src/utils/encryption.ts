import bcrypt from 'bcrypt';
const saltRounds = 10;

const hashPassword = async (password: string) => {
  return bcrypt.hash(password, saltRounds);
};

const comparePassword = (password: string, passwordHash: string) => {
  return bcrypt.compare(password, passwordHash);
};

export { hashPassword, comparePassword };
