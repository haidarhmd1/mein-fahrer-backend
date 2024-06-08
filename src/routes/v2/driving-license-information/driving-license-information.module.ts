import { Module } from '@nestjs/common';
import { DrivingLicenseInformationService } from './driving-license-information.service';
import { DrivingLicenseInformationController } from './driving-license-information.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DrivingLicenseInformation } from './entities/driving-license-information.entity';
import { UsersModule } from '../users/users.module';
import { UserValidationService } from 'src/common/services/validation/userValidation.service';

@Module({
  imports: [TypeOrmModule.forFeature([DrivingLicenseInformation]), UsersModule],
  controllers: [DrivingLicenseInformationController],
  providers: [DrivingLicenseInformationService, UserValidationService],
})
export class DrivingLicenseInformationModule {}
