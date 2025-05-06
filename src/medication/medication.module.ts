import { Module } from '@nestjs/common';
import { MedicationService } from './medication.service';
import { MedicationController } from './medication.controller';
import { Medication } from '../schemas/medication.schema';
import { MedicationRepository } from './medication.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/schemas/user.schema';
import { MedicationScheduleModule } from 'src/medication-schedule/medication-schedule.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Medication, User]),
    MedicationScheduleModule,
  ],
  providers: [MedicationService, MedicationRepository],
  controllers: [MedicationController],
})
export class MedicationModule {}
