import {Module} from "@nestjs/common";
import {PrismaService} from "../prisma.service";
import {ClassService} from "./class.service";
import {ClassController} from "./class.controller";

@Module({
    imports: [],
    controllers: [ClassController],
    providers: [ClassService,PrismaService],
})

export class ClassModule {}
