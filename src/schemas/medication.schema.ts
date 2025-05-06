import { User } from 'src/schemas/user.schema';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MedicationSchedule } from './medication-schedule.schema';

@Entity({ name: 'medications' })
export class Medication {
  @PrimaryGeneratedColumn('uuid') // Use UUID for primary key
  id: string;

  @Column()
  medicationName: string;

  @Column()
  dosage: string; // 1 pil

  @Column()
  frequency: string; // 3 times per day = every 8 h

  @Column()
  duration: number; // for 5 days

  @Column({ nullable: true, default: '' })
  medicationNotes?: string;

  @Column()
  initialStock: number; //total amount 10 pills

  @Column({ nullable: true, default: false })
  lowStock: boolean; // Boolean field for tracking low stock

  @Column({ nullable: true })
  firstIntake: Date;

  @Column({ nullable: true })
  startDate: Date;

  @Column({ nullable: true })
  endDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.medications)
  user: User;

  @OneToMany(
    () => MedicationSchedule,
    (medicationSchedules) => medicationSchedules.medication,
  ) // Reverse relation
  medicationSchedule: MedicationSchedule[];
}
