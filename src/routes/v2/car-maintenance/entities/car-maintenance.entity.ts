import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  BaseEntity,
  JoinColumn,
} from 'typeorm';
import { Car } from '../../cars/entities/car.entity';

@Entity()
export class CarMaintenance extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  km: number;

  @Column({ type: 'bigint', nullable: true })
  km_date: number;

  @Column({ type: 'bigint', nullable: true })
  date_last_oil_change: number;

  @Column({ type: 'bigint', nullable: true })
  date_next_oil_change: number;

  @Column({ type: 'int', nullable: true })
  km_last_oil_change: number;

  @Column({ type: 'int', nullable: true })
  km_next_oil_change: number;

  @Column({ nullable: true })
  tire_type: string;

  @Column({ nullable: true })
  tire_manufacturer: string;

  @ManyToOne(() => Car, (car) => car.carMaintenances) // Establish Many-to-One relationship with Car
  @JoinColumn({ name: 'car_id', referencedColumnName: 'id' }) // Define the foreign key column
  car: Car;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date;
}
