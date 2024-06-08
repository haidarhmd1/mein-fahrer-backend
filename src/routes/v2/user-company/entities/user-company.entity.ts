import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Company } from '../../company/entities/company.entity';
import { Shift } from '../../shift/entities/shift.entity';

@Entity('usercompany')
export class UserCompany {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Company)
  @JoinColumn()
  company: Company;

  @Column({ type: 'boolean', default: true })
  isUserActive: boolean;

  @Column({ type: 'bigint' })
  start_date: number;

  @Column({ type: 'bigint', nullable: true })
  end_date: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date;

  @OneToMany(() => Shift, (shift) => shift.userCompany)
  shifts: Shift[];
}
