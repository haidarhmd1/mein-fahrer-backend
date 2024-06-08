import { Module } from '@nestjs/common';
import { NotificationModule } from './routes/v1/notification/notification.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './routes/v2/users/users.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { CompanyModule } from './routes/v2/company/company.module';
import { UserCompanyModule } from './routes/v2/user-company/user-company.module';
import { CarsModule } from './routes/v2/cars/cars.module';
import { CarMaintenanceModule } from './routes/v2/car-maintenance/car-maintenance.module';
import { WorkInformationModule } from './routes/v2/work-information/work-information.module';
import { BankingInformationModule } from './routes/v2/banking-information/banking-information.module';
import { DrivingLicenseInformationModule } from './routes/v2/driving-license-information/driving-license-information.module';
import { TaxInsuranceInformationModule } from './routes/v2/tax-insurance-information/tax-insurance-information.module';
import { ShiftModule } from './routes/v2/shift/shift.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    NotificationModule,
    UsersModule,
    AuthModule,
    CompanyModule,
    UserCompanyModule,
    CarsModule,
    CarMaintenanceModule,
    WorkInformationModule,
    BankingInformationModule,
    DrivingLicenseInformationModule,
    TaxInsuranceInformationModule,
    ShiftModule,
  ],
})
export class AppModule {}
