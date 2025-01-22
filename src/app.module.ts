import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MedicationModule } from './medication/medication.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot('mongodb://localhost/reminderApp'),
    UsersModule,
    AuthModule,
    MedicationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
