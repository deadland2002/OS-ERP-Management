/*
  Warnings:

  - A unique constraint covering the columns `[coordinator]` on the table `Class` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Class_coordinator_key" ON "Class"("coordinator");
