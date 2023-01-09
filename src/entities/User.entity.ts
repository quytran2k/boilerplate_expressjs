import { Column, Entity } from 'typeorm';
import { CustomBaseEntity } from './customBaseEntity.entity';

@Entity()
export class User extends CustomBaseEntity {
  @Column()
  name?: string;

  @Column({ unique: true })
  email?: string;

  @Column()
  password?: string;

  @Column({ nullable: true })
  accessToken?: string;

  @Column({ nullable: true })
  refreshToken?: string;
}
