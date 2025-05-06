import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Medication } from './medication.schema';
import { MedicationSchedule } from './medication-schedule.schema';

@Entity()
@Unique(['email', 'phoneNumber']) // Ensuring unique constraint for both email and phoneNumber
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string; // Automatically generated primary key

  @Column({ nullable: true })
  userName?: string; // Optional column

  @Column({ unique: true })
  email: string; // Unique email column

  @Column({ unique: true })
  phoneNumber: string; // Unique phone number column

  @Column({ select: false })
  password: string; // Password column

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Medication, (medication) => medication.user) // Reverse relation
  medications: Medication[];

  @OneToMany(
    () => MedicationSchedule,
    (medicationSchedules) => medicationSchedules.user,
  ) // Reverse relation
  medicationSchedule: MedicationSchedule[];
}
