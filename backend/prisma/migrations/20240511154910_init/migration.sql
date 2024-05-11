-- AddForeignKey
ALTER TABLE "TimeTable" ADD CONSTRAINT "TimeTable_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "Class"("class_id") ON DELETE RESTRICT ON UPDATE CASCADE;
