import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  DeleteDateColumn,
} from 'typeorm';
import { Car } from '../../cars/entities/car.entity';
import { ShiftType } from 'src/common/types/shift';
import { UserCompany } from '../../user-company/entities/user-company.entity';

@Entity()
export class Shift extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserCompany, (userCompany) => userCompany.shifts)
  userCompany: UserCompany;

  @ManyToOne(() => Car)
  car: Car;

  @Column({ type: 'bigint' }) // Store Unix timestamp as bigint
  date_and_time_start: number;

  @Column({ type: 'bigint' }) // Store Unix timestamp as bigint
  date_and_time_end: number;

  @Column({ type: 'double precision' })
  km_start: number;

  @Column({ type: 'double precision' })
  km_end: number;

  @Column()
  pictures_shift_start: string;

  @Column()
  pictures_shift_end: string;

  @Column({ type: 'json' }) // Adjust to use 'json' type for storing JSON objects
  place_of_shift_start: object;

  @Column({
    type: 'enum',
    enum: ShiftType,
    default: ShiftType.DAY,
  })
  shift_type: ShiftType;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date;
}
