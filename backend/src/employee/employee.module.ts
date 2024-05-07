import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { PrismaService } from '../prisma.service';

@Module({
  imports: [],
  controllers: [EmployeeController],
  providers: [EmployeeService, PrismaService],
})
export class EmployeeModule {}
