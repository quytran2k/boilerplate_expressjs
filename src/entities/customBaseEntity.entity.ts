import { BaseEntity, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ synchronize: false })
export class CustomBaseEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: number;

  @CreateDateColumn({ select: true })
  createdAt?: Date;

  @UpdateDateColumn({ select: false })
  updatedAt?: Date;

  @DeleteDateColumn({ select: false })
  deletedAt?: Date;
}
