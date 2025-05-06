import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MedicationModule } from './medication/medication.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './schemas/user.schema';
import { Medication } from './schemas/medication.schema';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksModule } from './tasks/tasks.module';
import { MedicationScheduleModule } from './medication-schedule/medication-schedule.module';
import { MedicationSchedule } from './schemas/medication-schedule.schema';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres', // Database type
      host: 'localhost', // Database host
      port: 5432, // PostgreSQL default port
      username: 'postgres', // Your database username
      password: 'postgres', // Your database password
      database: 'reminderapp', // Your database name
      entities: [User, Medication, MedicationSchedule], // Add your entities here
      synchronize: true, // Set to false in production, it auto syncs schema (for dev only)
    }),
    TypeOrmModule.forFeature([User, Medication, MedicationSchedule]), // Add entities for this module
    UsersModule,
    AuthModule,
    MedicationModule,
    TasksModule,
    MedicationScheduleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
