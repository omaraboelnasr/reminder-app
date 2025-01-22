import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { MedicationRepository } from './medication.repository';
import {
  CreateMedicationParams,
  ListMedicationParams,
  UpdateMedicationParams,
} from './types';

@Injectable()
export class MedicationService {
  constructor(private MedicationRepository: MedicationRepository) {}

  async createMedication(medication: CreateMedicationParams) {
    try {
      await this.MedicationRepository.createMedication(medication);
      return { message: 'Medication added successfully' };
    } catch (error) {
      throw error;
    }
  }

  async updateMedication(
    id: string,
    medication: UpdateMedicationParams,
    userId: string,
  ) {
    try {
      const existingMedication =
        await this.MedicationRepository.findMedicationById(id);

      if (!existingMedication) {
        throw new NotFoundException(`Medication with ID "${id}" not found`);
      }

      if (existingMedication.userId.toString() !== userId) {
        throw new UnauthorizedException(
          'You are not authorized to update this medication',
        );
      }

      await this.MedicationRepository.updateMedication(id, medication);

      return { message: 'Medication Update successfully' };
    } catch (error) {
      throw error;
    }
  }

  async deleteMedication(id: string, userId: string) {
    try {
      const existingMedication =
        await this.MedicationRepository.findMedicationById(id);

      if (!existingMedication) {
        throw new NotFoundException(`Medication with ID "${id}" not found`);
      }

      if (existingMedication.userId.toString() !== userId) {
        throw new UnauthorizedException(
          'You are not authorized to delete this medication',
        );
      }

      await this.MedicationRepository.deleteMedication(id);

      return { message: 'Medication deleted successfully' };
    } catch (error) {
      throw error;
    }
  }

  async getMedication(id: string, userId: string) {
    try {
      const existingMedication =
        await this.MedicationRepository.findMedicationById(id);

      if (!existingMedication) {
        throw new NotFoundException(`Medication with ID "${id}" not found`);
      }

      if (existingMedication.userId.toString() !== userId) {
        throw new UnauthorizedException(
          'You are not authorized to get this medication',
        );
      }
      return existingMedication;
    } catch (error) {
      throw error;
    }
  }

  async getAllMedication(params: ListMedicationParams, userId: string) {
    try {
      const safeLimit = Math.min(params.limit, 20);
      const { medications, total } =
        await this.MedicationRepository.getAllMedication(
          safeLimit,
          params.skip,
          userId,
        );
      return { data: medications, limit: safeLimit, skip: params.skip, total };
    } catch (error) {
      throw error;
    }
  }
}
