import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ManagementService } from './management.service';
import { ManagementController } from './management.controller';

@Module({
  imports: [],
  controllers: [ManagementController],
  providers: [ManagementService, PrismaService],
})
export class ManagementModule {}
