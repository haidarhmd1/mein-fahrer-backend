import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BaseEntity,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class WorkInformation extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'identifier_uber' })
  identifierUber: string;

  @Column({ name: 'identifier_bolt' })
  identifierBolt: string;

  @Column({ name: 'identifier_freenow' })
  identifierFreeNow: string;

  @Column({ type: 'bigint', name: 'entry_date' })
  entryDate: number;

  @Column({ type: 'bigint', name: 'end_of_work' })
  endOfWork: number;

  @OneToOne(() => User, (user) => user.workInformation)
  @JoinColumn()
  user: User;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date;
}
