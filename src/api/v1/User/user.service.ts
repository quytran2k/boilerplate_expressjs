import logger from '../../../utils/winston';
import { newUser } from './interface/user.interface';
import { userRepository } from './user.repository';

export class UserService {
  async getPassword(email: string) {
    // Check exist email
    const isExist = await userRepository.findOneBy({ email });
    if (!isExist)
      // Error
      logger.error(`User ${email} does not exist`);
    return isExist?.password;
  }
  public async findAllUsers() {
    const users = await userRepository.find();
    return users;
  }
  async signUpUser(user: newUser) {
    const users = await userRepository.save({
      name: user.name,
      email: user.email,
      password: user.password,
    });
    console.log(users);
  }
}
