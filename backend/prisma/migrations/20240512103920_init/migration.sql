/*
  Warnings:

  - A unique constraint covering the columns `[class_id,day,lecture]` on the table `TimeTable` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TimeTable_class_id_day_lecture_key" ON "TimeTable"("class_id", "day", "lecture");
