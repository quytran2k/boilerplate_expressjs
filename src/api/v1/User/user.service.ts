import { DataSource } from 'typeorm';
import { UserRepository } from './user.repository';

export class UserService extends UserRepository {
  constructor(dataSource: DataSource) {
    super(dataSource);
  }

  public async findAllUsers() {
    const users = await this.find();
    return users;
  }
}
