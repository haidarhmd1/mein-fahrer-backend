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
import { IsOptional } from 'class-validator';

@Entity()
export class Shift extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserCompany, (userCompany) => userCompany.shifts)
  userCompany: UserCompany;

  @ManyToOne(() => Car)
  car: Car;

  @Column({ type: 'bigint' })
  date_and_time_start: number;

  @Column({ type: 'bigint', nullable: true })
  @IsOptional()
  date_and_time_end: number;

  @Column()
  km_start: number;

  @Column({ nullable: true })
  @IsOptional()
  km_end: number;

  @Column()
  pictures_shift_start: string;

  @Column({ nullable: true })
  @IsOptional()
  pictures_shift_end: string;

  @Column({ type: 'json' })
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
