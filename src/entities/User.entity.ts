import { Column, Entity, OneToOne } from 'typeorm';
import { CustomBaseEntity } from './customBaseEntity.entity';
import { UserToken } from './UserToken.entity';

@Entity()
export class User extends CustomBaseEntity {
  @Column()
  name?: string;

  @Column({ unique: true })
  email?: string;

  @Column()
  password?: string;

  @OneToOne(() => UserToken, (userToken) => userToken.user)
  userToken?: UserToken;
}
