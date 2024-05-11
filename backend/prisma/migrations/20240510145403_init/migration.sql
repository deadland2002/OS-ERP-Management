/*
  Warnings:

  - A unique constraint covering the columns `[uid]` on the table `Student_Details` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `city` to the `Student_Details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country_code` to the `Student_Details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date_of_birth` to the `Student_Details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_name` to the `Student_Details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `Student_Details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `middle_name` to the `Student_Details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pincode` to the `Student_Details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Student_Details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uid` to the `Student_Details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uid_type` to the `Student_Details` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Student_Details" ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "country_code" INTEGER NOT NULL,
ADD COLUMN     "date_of_birth" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "first_name" TEXT NOT NULL,
ADD COLUMN     "last_name" TEXT NOT NULL,
ADD COLUMN     "middle_name" TEXT NOT NULL,
ADD COLUMN     "pincode" INTEGER NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL,
ADD COLUMN     "uid" TEXT NOT NULL,
ADD COLUMN     "uid_type" TEXT NOT NULL,
ALTER COLUMN "rollnumber" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "image_url" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Student_Details_uid_key" ON "Student_Details"("uid");
