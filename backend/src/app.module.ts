import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {UserModule} from "./User/user.module";
import {ClassModule} from "./class/class.module";
import {APP_GUARD} from "@nestjs/core";
import {RolesGuard} from "./Role/role.guard";
import {PrismaService} from "./prisma.service";

@Module({
  imports: [UserModule,ClassModule],
  controllers: [AppController],
  providers: [AppService,PrismaService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
