-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_coordinator_fkey";

-- AlterTable
ALTER TABLE "Class" ALTER COLUMN "coordinator" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_coordinator_fkey" FOREIGN KEY ("coordinator") REFERENCES "Employee_Details"("employee_id") ON DELETE SET NULL ON UPDATE CASCADE;
