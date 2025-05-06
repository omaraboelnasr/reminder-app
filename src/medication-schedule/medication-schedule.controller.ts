import {
  Controller,
  Get,
  Param,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { MedicationScheduleService } from './medication-schedule.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { IdParam } from './dto/idParam.dto';
import { MedicationScheduleResponseDto } from './dto/medicationResponse.dto';
import { ListMedicationsScheduleRequest } from './dto/listMedicationRequest.dto';
import { MedicationScheduleListResponseDto } from './dto/medicationsListResponse.dto';

@Controller('medication-schedule')
export class MedicationScheduleController {
  constructor(public MedicationScheduleService: MedicationScheduleService) {}

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async getMedication(@Param() { id }: IdParam, @Request() req: any) {
    const userId = req.user.userId;
    const MedicationSchedule =
      await this.MedicationScheduleService.getMedicationSchedule(id, userId);
    return new MedicationScheduleResponseDto(MedicationSchedule);
  }

  @Get('/medication/:id')
  @UseGuards(JwtAuthGuard)
  async getAllMedicationSchedule(
    @Param() { id }: IdParam,
    @Query() queryParams: ListMedicationsScheduleRequest,
    @Request() req: any,
  ) {
    const userId = req.user.userId;
    const { data, limit, skip, total } =
      await this.MedicationScheduleService.getAllMedicationSchedule(
        queryParams,
        userId,
        id,
      );
    return new MedicationScheduleListResponseDto(data, limit, skip, total);
  }
}
