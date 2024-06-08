import { Module } from '@nestjs/common';
import { WorkInformationService } from './work-information.service';
import { WorkInformationController } from './work-information.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkInformation } from './entities/work-information.entity';
import { UserValidationService } from 'src/common/services/validation/userValidation.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([WorkInformation]), UsersModule],
  controllers: [WorkInformationController],
  providers: [WorkInformationService, UserValidationService],
})
export class WorkInformationModule {}
