import { dataSource } from '../../../configs/database/ormconfig';
import { User } from '../../../entities/User.entity';

// Custom Repository Service
export const userRepository = dataSource.getRepository(User).extend({
  findTest() {
    return this.createQueryBuilder('user').getMany();
  },
});
