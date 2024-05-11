-- AlterTable
ALTER TABLE "Class" ADD COLUMN     "end_date" TIMESTAMP(3),
ADD COLUMN     "start_date" TIMESTAMP(3),
ADD COLUMN     "total_months" INTEGER NOT NULL DEFAULT 12;
