import bcrypt from 'bcrypt';
const saltRounds = 10;
const myPlaintextPassword = 's0//P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

const hashPassword = async (password: string) => {
  // const salt = await bcrypt.genSalt(Number(getEnv('SALT_ROUND')));
  // return bcrypt.hash(password, salt);
  bcrypt.hash(password, saltRounds, function (err, hash) {
    console.log(hash);
    // Store hash in your password DB.
  });
};

hashPassword('test');
// const comparePassword = (password, passwordHash) => {
//   try {
//     return bcrypt.compare(password, passwordHash);
//   } catch (e) {
//     throw e;
//   }
// };

// export { hashPassword, comparePassword };
