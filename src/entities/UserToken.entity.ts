import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { CustomBaseEntity } from './customBaseEntity.entity';
import { User } from './User.entity';

@Entity()
export class UserToken extends CustomBaseEntity {
  @Column({ unique: true })
  refreshToken?: string;

  @OneToOne(() => User, (user) => user.userToken)
  @JoinColumn()
  user?: User;
}
