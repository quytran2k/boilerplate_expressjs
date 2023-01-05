import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CustomBaseEntity } from './customBaseEntity.entity';

@Entity()
export class User extends CustomBaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name?: string;

  @Column()
  email?: string;

  @Column()
  password?: string;
}
