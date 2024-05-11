/*
  Warnings:

  - You are about to drop the column `suject_id` on the `TimeTable` table. All the data in the column will be lost.
  - Added the required column `subject_id` to the `TimeTable` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TimeTable" DROP CONSTRAINT "TimeTable_suject_id_fkey";

-- AlterTable
ALTER TABLE "TimeTable" DROP COLUMN "suject_id",
ADD COLUMN     "subject_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "TimeTable" ADD CONSTRAINT "TimeTable_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "Subject"("subject_id") ON DELETE RESTRICT ON UPDATE CASCADE;
