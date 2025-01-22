import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { MedicationService } from './medication.service';
import { CreateMedicationDTO } from './dto/createMedication.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { IdParam } from './dto/idParam.dto';
import { UpdateMedicationDTO } from './dto/updateMedication.dto';

@Controller('medication')
export class MedicationController {
  constructor(public medicationService: MedicationService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createMedication(
    @Body() createMedicationDTO: CreateMedicationDTO,
    @Request() req: any,
  ) {
    const userId = req.user.userId;
    return this.medicationService.createMedication({
      ...createMedicationDTO,
      userId,
    });
  }

  @Patch('/:id')
  @UseGuards(JwtAuthGuard)
  updateMedication(
    @Param() { id }: IdParam,
    @Body() updateMedicationDto: UpdateMedicationDTO,
    @Request() req: any,
  ) {
    const userId = req.user.userId;
    return this.medicationService.updateMedication(
      id,
      updateMedicationDto,
      userId,
    );
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  deleteMedication(@Param() { id }: IdParam, @Request() req: any) {
    const userId = req.user.userId;
    return this.medicationService.deleteMedication(id, userId);
  }
}
