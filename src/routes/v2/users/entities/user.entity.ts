import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
} from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToOne,
} from 'typeorm';
import { FamilyStatus, GenderRole, UserRole } from 'src/common/types/user';
import { WorkInformation } from '../../work-information/entities/work-information.entity';
import { BankingInformation } from '../../banking-information/entities/banking-information.entity';
import { DrivingLicenseInformation } from '../../driving-license-information/entities/driving-license-information.entity';
import { TaxInsuranceInformation } from '../../tax-insurance-information/entities/tax-insurance-information.entity';
import { CarMaintenance } from '../../car-maintenance/entities/car-maintenance.entity';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column('simple-array', { nullable: true })
  onesignal_identifier: string[];

  @Column({ nullable: true })
  @IsOptional()
  user_avatar: string;

  @Column({ unique: true })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Column({ nullable: true })
  @IsPhoneNumber()
  phoneNumber: string;

  @Column({ nullable: true })
  dob: string;

  @Column({ nullable: true })
  placeOfBirth: string;

  @Column({ nullable: true })
  nationality: string;

  @Column()
  @IsNotEmpty()
  password: string;

  @Column({
    type: 'enum',
    enum: GenderRole,
    default: GenderRole.MALE,
  })
  gender: GenderRole;

  @Column({
    type: 'enum',
    enum: FamilyStatus,
    default: FamilyStatus.OTHER,
  })
  familyStatus: FamilyStatus;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date;

  // Define OneToOne relationships without foreign key columns
  @OneToOne(() => WorkInformation, (workInformation) => workInformation.user, {
    cascade: true,
  })
  workInformation: WorkInformation;

  @OneToOne(
    () => BankingInformation,
    (bankingInformation) => bankingInformation.user,
    { cascade: true },
  )
  bankingInformation: BankingInformation;

  @OneToOne(
    () => DrivingLicenseInformation,
    (drivingLicenseInformation) => drivingLicenseInformation.user,
    { cascade: true },
  )
  drivingLicenseInformation: DrivingLicenseInformation;

  @OneToOne(
    () => TaxInsuranceInformation,
    (taxInsuranceInformation) => taxInsuranceInformation.user,
    { cascade: true },
  )
  taxInsuranceInformation: TaxInsuranceInformation;

  @OneToOne(() => CarMaintenance, { cascade: true })
  carMaintenance: CarMaintenance;
}
