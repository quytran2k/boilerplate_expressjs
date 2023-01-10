import { newUser } from './interface/user.interface';
import { userRepository } from './user.repository';

export class UserService {
  public async findAllUsers() {
    const users = await userRepository.find({
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    return users;
  }
  async newUser(user: newUser) {
    const users = await userRepository.save({
      name: user.name,
      email: user.email,
      password: user.password,
    });
  }
}
