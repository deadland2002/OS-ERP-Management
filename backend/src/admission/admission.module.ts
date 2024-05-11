import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { AdmissionService } from './admission.service';
import { AdmissionController } from './admission.controller';

@Module({
  imports: [],
  controllers: [AdmissionController],
  providers: [AdmissionService, PrismaService],
})
export class AdmissionModule {}
