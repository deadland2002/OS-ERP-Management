import * as bcrypt from 'bcrypt';

const stringToPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
  return await bcrypt.hash(password, salt);
};

export default stringToPassword;
