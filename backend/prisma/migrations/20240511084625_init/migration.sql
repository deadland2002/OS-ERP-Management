/*
  Warnings:

  - You are about to drop the column `alternate_mob_number` on the `Employee_Details` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[uid]` on the table `Employee_Details` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `alternate_number` to the `Employee_Details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Employee_Details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country_code` to the `Employee_Details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date_of_birth` to the `Employee_Details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `father_name` to the `Employee_Details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_name` to the `Employee_Details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `Employee_Details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `middle_name` to the `Employee_Details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mother_name` to the `Employee_Details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pincode` to the `Employee_Details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Employee_Details` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Teaches" DROP CONSTRAINT "Teaches_teacher_id_fkey";

-- AlterTable
ALTER TABLE "Class" ADD COLUMN     "total_lectures" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Employee_Details" DROP COLUMN "alternate_mob_number",
ADD COLUMN     "alternate_number" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "country_code" INTEGER NOT NULL,
ADD COLUMN     "date_of_birth" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "father_name" TEXT NOT NULL,
ADD COLUMN     "first_name" TEXT NOT NULL,
ADD COLUMN     "last_name" TEXT NOT NULL,
ADD COLUMN     "middle_name" TEXT NOT NULL,
ADD COLUMN     "mother_name" TEXT NOT NULL,
ADD COLUMN     "pincode" INTEGER NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Employee_Details_uid_key" ON "Employee_Details"("uid");

-- AddForeignKey
ALTER TABLE "Teaches" ADD CONSTRAINT "Teaches_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "Employee_Details"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;
