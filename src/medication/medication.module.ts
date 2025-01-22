import { Module } from '@nestjs/common';
import { MedicationService } from './medication.service';
import { MedicationController } from './medication.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Medication, MedicationSchema } from './schemas/medication.schema';
import { MedicationRepository } from './medication.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Medication.name,
        schema: MedicationSchema,
      },
    ]),
  ],
  providers: [MedicationService, MedicationRepository],
  controllers: [MedicationController],
})
export class MedicationModule {}
