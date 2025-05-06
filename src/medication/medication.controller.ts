import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { MedicationService } from './medication.service';
import { CreateMedicationDTO } from './dto/createMedication.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { IdParam } from './dto/idParam.dto';
import { UpdateMedicationDTO } from './dto/updateMedication.dto';
import { ListMedicationsRequest } from './dto/listMedicationRequest.dto';
import { MedicationResponseDto } from './dto/medicationResponse.dto';
import { MedicationListResponseDto } from './dto/medicationsListResponse.dto';

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
    return this.medicationService.createMedication(createMedicationDTO, userId);
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

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async getMedication(@Param() { id }: IdParam, @Request() req: any) {
    const userId = req.user.userId;
    const medication = await this.medicationService.getMedication(id, userId);
    return new MedicationResponseDto(medication);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllMedication(
    @Query() queryParams: ListMedicationsRequest,
    @Request() req: any,
  ) {
    const userId = req.user.userId;
    const { data, limit, skip, total } =
      await this.medicationService.getAllMedication(queryParams, userId);
    return new MedicationListResponseDto(data, limit, skip, total);
  }
}
