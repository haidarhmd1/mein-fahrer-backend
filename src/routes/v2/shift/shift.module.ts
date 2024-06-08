import { Module } from '@nestjs/common';
import { ShiftService } from './shift.service';
import { ShiftController } from './shift.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shift } from './entities/shift.entity';
import { UserCompanyModule } from '../user-company/user-company.module';
import { CarsModule } from '../cars/cars.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Shift]),
    UserCompanyModule,
    CarsModule,
    UsersModule,
  ],
  controllers: [ShiftController],
  providers: [ShiftService],
})
export class ShiftModule {}
