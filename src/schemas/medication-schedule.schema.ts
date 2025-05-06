import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.schema';
import { Medication } from './medication.schema';

@Entity({ name: 'medicationSchedule' })
export class MedicationSchedule {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.medicationSchedule)
  user: User;

  @ManyToOne(() => Medication, (medication) => medication.medicationSchedule)
  medication: Medication;

  @Column()
  dosage: string;

  @Column()
  date: Date; // the exact calendar date

  @Column()
  time: string; // e.g., "08:00"

  @Column({ default: false })
  isNotified: boolean;
}
