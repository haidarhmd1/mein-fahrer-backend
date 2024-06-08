// tax-insurance-information.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class TaxInsuranceInformation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'tax_class' })
  taxClass: string;

  @Column({ name: 'tax_id' })
  taxId: string;

  @Column({ name: 'insurance_number' })
  insuranceNumber: string;

  @Column({ name: 'health_insurance' })
  healthInsurance: string;

  @Column({ name: 'health_insurance_number' })
  healthInsuranceNumber: string;

  @Column({ name: 'child_allowance' })
  childAllowance: boolean;

  @OneToOne(() => User, (user) => user.taxInsuranceInformation)
  @JoinColumn()
  user: User;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date;
}
