import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ClassModule } from './class/class.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './Role/role.guard';
import { PrismaService } from './prisma.service';
import { AdmissionModule } from './admission/admission.module';
import { SubjectModule } from './subject/subject.module';
import { TimetableModule } from './timetable/timetable.module';
import { EmployeeModule } from './employee/employee.module';
import { StudentModule } from './student/student.module';
import { AttendanceModule } from './attendance/attendance.module';

@Module({
  imports: [
    UserModule,
    ClassModule,
    AdmissionModule,
    SubjectModule,
    TimetableModule,
    EmployeeModule,
    StudentModule,
    AttendanceModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
