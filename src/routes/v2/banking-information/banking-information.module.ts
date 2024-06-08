import { Module } from '@nestjs/common';
import { BankingInformationService } from './banking-information.service';
import { BankingInformationController } from './banking-information.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankingInformation } from './entities/banking-information.entity';
import { UsersModule } from '../users/users.module';
import { UserValidationService } from 'src/common/services/validation/userValidation.service';

@Module({
  imports: [TypeOrmModule.forFeature([BankingInformation]), UsersModule],
  controllers: [BankingInformationController],
  providers: [BankingInformationService, UserValidationService],
})
export class BankingInformationModule {}
