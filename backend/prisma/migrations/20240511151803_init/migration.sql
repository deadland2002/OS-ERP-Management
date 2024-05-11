-- CreateEnum
CREATE TYPE "Days" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

-- CreateTable
CREATE TABLE "TimeTable" (
    "class_id" INTEGER NOT NULL,
    "day" "Days" NOT NULL,
    "lecture" INTEGER NOT NULL,
    "suject_id" INTEGER NOT NULL,
    "teacher_id" INTEGER NOT NULL,
    "teacher_name" TEXT NOT NULL,
    "subject_name" TEXT NOT NULL,

    CONSTRAINT "TimeTable_pkey" PRIMARY KEY ("class_id","day","lecture")
);

-- AddForeignKey
ALTER TABLE "TimeTable" ADD CONSTRAINT "TimeTable_suject_id_fkey" FOREIGN KEY ("suject_id") REFERENCES "Subject"("subject_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeTable" ADD CONSTRAINT "TimeTable_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "Employee_Details"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;
