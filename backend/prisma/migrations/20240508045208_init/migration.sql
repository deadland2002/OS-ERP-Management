-- CreateEnum
CREATE TYPE "Role" AS ENUM ('TEACHER', 'ADMIN', 'ACCOUNTS', 'STUDENT', 'ADMISSION', 'MANAGEMENT');

-- CreateTable
CREATE TABLE "User" (
    "user_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "mobileNo" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'TEACHER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Token" (
    "token" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "exp_At" TIMESTAMP(3) NOT NULL,
    "ip" TEXT,
    "role" "Role" NOT NULL,
    "is_logged_out" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "Student_Details" (
    "student_id" INTEGER NOT NULL,
    "class_id" INTEGER NOT NULL,
    "rollnumber" BIGINT NOT NULL,
    "father_name" TEXT NOT NULL,
    "mother_name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "alternate_number" TEXT NOT NULL,
    "guardian_name" TEXT NOT NULL,
    "guardian_relation" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Employee_Details" (
    "employee_id" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "alternate_mob_number" TEXT NOT NULL,
    "guardian_name" TEXT NOT NULL,
    "guardian_relation" TEXT NOT NULL,
    "uid" TEXT NOT NULL,
    "uid_type" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Class" (
    "class_id" SERIAL NOT NULL,
    "class_name" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "coordinator" INTEGER NOT NULL,
    "fees_per_month" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Class_pkey" PRIMARY KEY ("class_id")
);

-- CreateTable
CREATE TABLE "Subject" (
    "subject_id" SERIAL NOT NULL,
    "subject_name" TEXT NOT NULL,
    "subject_code" TEXT NOT NULL,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("subject_id")
);

-- CreateTable
CREATE TABLE "Teaches" (
    "teacher_id" INTEGER NOT NULL,
    "subject_id" INTEGER NOT NULL,

    CONSTRAINT "Teaches_pkey" PRIMARY KEY ("teacher_id","subject_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_mobileNo_key" ON "User"("mobileNo");

-- CreateIndex
CREATE UNIQUE INDEX "Token_token_key" ON "Token"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Token_user_id_key" ON "Token"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Student_Details_student_id_key" ON "Student_Details"("student_id");

-- CreateIndex
CREATE UNIQUE INDEX "Student_Details_rollnumber_key" ON "Student_Details"("rollnumber");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_Details_employee_id_key" ON "Employee_Details"("employee_id");

-- CreateIndex
CREATE UNIQUE INDEX "Class_class_name_key" ON "Class"("class_name");

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student_Details" ADD CONSTRAINT "Student_Details_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student_Details" ADD CONSTRAINT "Student_Details_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "Class"("class_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee_Details" ADD CONSTRAINT "Employee_Details_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_coordinator_fkey" FOREIGN KEY ("coordinator") REFERENCES "Employee_Details"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teaches" ADD CONSTRAINT "Teaches_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teaches" ADD CONSTRAINT "Teaches_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "Subject"("subject_id") ON DELETE RESTRICT ON UPDATE CASCADE;
