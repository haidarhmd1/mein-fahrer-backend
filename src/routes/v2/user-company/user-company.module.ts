import { Module } from '@nestjs/common';
import { UserCompanyService } from './user-company.service';
import { UserCompanyController } from './user-company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCompany } from './entities/user-company.entity';
import { CompanyModule } from '../company/company.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserCompany]),
    CompanyModule,
    UsersModule,
  ],
  controllers: [UserCompanyController],
  providers: [UserCompanyService],
  exports: [UserCompanyService],
})
export class UserCompanyModule {}
