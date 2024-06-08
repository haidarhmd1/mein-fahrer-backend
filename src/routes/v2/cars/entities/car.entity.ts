import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BaseEntity,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { CarMaintenance } from '../../car-maintenance/entities/car-maintenance.entity'; // Import the CarMaintenance entity
import { Company } from '../../company/entities/company.entity';

@Entity()
export class Car extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Company)
  @JoinColumn()
  company: Company;

  @Column()
  license_plate: string;

  @Column()
  VIN: string;

  @Column()
  HSN: string;

  @Column()
  TSN: string;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column()
  year_of_production: string;

  @Column()
  color: string;

  @Column({ type: 'bigint' })
  date_eichung_last: number;

  @Column({ type: 'bigint' })
  date_Tuv_last: number;

  @Column({ type: 'bigint' })
  date_eichung_next: number;

  @Column({ type: 'bigint' })
  date_Tuv_next: number;

  @Column()
  insurance_nr: string;

  @Column({ type: 'int' })
  oil_change_interval: number;

  @Column()
  concession_number: string;

  @Column()
  tire_size: string;

  @OneToMany(() => CarMaintenance, (carMaintenance) => carMaintenance.car) // Define One-to-Many relationship with CarMaintenance
  carMaintenances: CarMaintenance[]; // Define the field to access CarMaintenance entries associated with this Car

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date;
}
