import { DataSource, Repository } from 'typeorm';
import { User } from '../../../entity/User';

export class UserRepository extends Repository<User> {
  constructor(dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }
}
