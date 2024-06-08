import { Module } from '@nestjs/common';
import { TaxInsuranceInformationService } from './tax-insurance-information.service';
import { TaxInsuranceInformationController } from './tax-insurance-information.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaxInsuranceInformation } from './entities/tax-insurance-information.entity';
import { UsersModule } from '../users/users.module';
import { UserValidationService } from 'src/common/services/validation/userValidation.service';

@Module({
  imports: [TypeOrmModule.forFeature([TaxInsuranceInformation]), UsersModule],
  controllers: [TaxInsuranceInformationController],
  providers: [TaxInsuranceInformationService, UserValidationService],
})
export class TaxInsuranceInformationModule {}
