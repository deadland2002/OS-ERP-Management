import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { SubjectService } from './subject.service';
import { SubjectController } from './subject.controller';

@Module({
  imports: [],
  controllers: [SubjectController],
  providers: [SubjectService, PrismaService],
})
export class SubjectModule {}
