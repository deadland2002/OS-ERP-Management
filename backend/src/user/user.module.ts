import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '../prisma.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, PrismaService],
})
export class UserModule {}
