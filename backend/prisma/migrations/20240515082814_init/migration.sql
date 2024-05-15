/*
  Warnings:

  - Added the required column `teacher_id` to the `Attendance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Attendance" ADD COLUMN     "block_reason" TEXT NOT NULL DEFAULT 'NA',
ADD COLUMN     "is_blocked" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "teacher_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "Employee_Details"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;
