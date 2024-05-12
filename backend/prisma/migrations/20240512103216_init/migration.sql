/*
  Warnings:

  - The primary key for the `TimeTable` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "TimeTable" DROP CONSTRAINT "TimeTable_pkey",
ADD CONSTRAINT "TimeTable_pkey" PRIMARY KEY ("teacher_id", "day", "lecture");
