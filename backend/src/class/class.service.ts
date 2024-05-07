import {Injectable} from '@nestjs/common';
import {PrismaService} from '../prisma.service';

@Injectable()
export class ClassService {
    constructor(private prisma: PrismaService) {}

    async EnrollInClass(){

    }
}
