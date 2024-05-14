-- CreateTable
CREATE TABLE "Attendance" (
    "date" TIMESTAMP(3) NOT NULL,
    "lecture" INTEGER NOT NULL,
    "student_id" INTEGER NOT NULL,
    "student_name" TEXT NOT NULL,

    CONSTRAINT "Attendance_pkey" PRIMARY KEY ("student_id","date","lecture")
);

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student_Details"("student_id") ON DELETE RESTRICT ON UPDATE CASCADE;
