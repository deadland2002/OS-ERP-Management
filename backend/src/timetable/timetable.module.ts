import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { TimetableService } from './timetable.service';
import { TimetableController } from './timetable.controller';

@Module({
  imports: [],
  controllers: [TimetableController],
  providers: [TimetableService, PrismaService],
})
export class TimetableModule {}
