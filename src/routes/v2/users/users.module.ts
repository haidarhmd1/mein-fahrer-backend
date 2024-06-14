import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AWSS3HelperService } from 'src/common/services/aws-s3/aws-s3.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, AWSS3HelperService],
  exports: [UsersService],
})
export class UsersModule {}
