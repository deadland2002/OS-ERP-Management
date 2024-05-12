import {Module} from "@nestjs/common";
import {PrismaService} from "../prisma.service";
import {StudentService} from "./student.service";
import {StudentController} from "./student.controller";

@Module({
    imports: [],
    controllers: [StudentController],
    providers: [StudentService,PrismaService],
})

export class StudentModule {}
