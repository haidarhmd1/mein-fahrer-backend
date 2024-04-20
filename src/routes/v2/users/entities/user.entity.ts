import { IsEmail, IsNotEmpty } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column('simple-array', { nullable: true })
  onesignal_identifier: string[];

  @Column({ unique: true })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Column()
  @IsNotEmpty()
  password: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date;
}
