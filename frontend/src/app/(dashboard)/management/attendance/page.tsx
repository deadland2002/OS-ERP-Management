"use client";

import React, { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { toastCompactTheme } from "../../../../../Default/toast";
import {Button, DateInput, DatePicker, Select, SelectItem} from "@nextui-org/react";
import {
  API_Class_Get_List,
  Class_Get_List_Type,
} from "../../../../../helper/API/class/get_class_list";
import {
  API_Class_Get_Student,
  StudentClassList,
} from "../../../../../helper/API/class/get_student_by_class";
import {API_Attendance_Get_Filtered, AttendanceList} from "../../../../../helper/API/attendance/get_filtered";
import PresentAttendanceList from "../../../../../components/dashboard/attendance/PresentAttendanceList";
import AbsentAttendanceList from "../../../../../components/dashboard/attendance/AbsentAttendanceList";
import {API_Attendance_Add_New_Bulk} from "../../../../../helper/API/attendance/add_new_bulk";

const Page = () => {
  const [classArr, setClassArr] = useState<Class_Get_List_Type[]>([]);
  const [selectedClass, setSelectedClass] =
    useState<Class_Get_List_Type | null>(null);
  const [studentData, setStudentData] = useState<StudentClassList[] | AttendanceList[]>([]);
  const [lectureArr,setLectureArr] = useState<string[]>([]);
  const [attendanceType,setAttendanceType] = useState<"ABSENT"|"PRESENT">("ABSENT");
  const [absentMarkPayload , setAbsentMarkPayload] = useState<{
    class_id:number,
    lecture: number[],
    date: string
  }|null>(null)

  const getClasses = async () => {
    const promise = new Promise(async (resolve, rej) => {
      const response = await API_Class_Get_List();
      if (response.message || !response.data) return rej(response.message);
      setClassArr(response.data);
      resolve(response);
    });
    await toast
      .promise(
        promise,
        {
          pending: "Fetching classes ...",
          success: "Classes fetched",
        },
        toastCompactTheme,
      )
      .catch((reason) => {
        for (const msg of reason) toast.error(msg, toastCompactTheme);
      });
  };

  useEffect(() => {
    const time = setTimeout(getClasses, 500);
    return () => clearTimeout(time);
  }, []);

  const HandleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const data = new FormData(form);
    const class_data = JSON.parse(data.get("class")?.toString() ?? "");
    const lecture_data = Array.from(lectureArr);
    const type_data = data.get("type");
    const date_data = data.get("date");
    const class_id = class_data.class_id;

    let date_today = new Date(`${date_data}`).toISOString().split("T")[0];
    let lecture_arr: number[] = [];

    for(const lecture of lecture_data){
      if(lecture === "ALL"){
        lecture_arr = [1,2,3,4,5,6,7,8];
        break;
      }else{
        lecture_arr.push(Number(lecture))
      }
    }

    console.log(lecture_arr);
    console.log(type_data);
    console.log(class_id);

    const promise = new Promise(async (resolve, reject) => {
      const response = await API_Attendance_Get_Filtered({
        class_id: class_id,
        date: date_today,
        lecture: lecture_arr,
        type: type_data as "ABSENT" | "PRESENT",
      });

      if (response.error) return reject(response.message);
      else if (response.data){
        console.log("data",response.data)
        setStudentData(response.data)
        setAttendanceType(type_data as "ABSENT" | "PRESENT")
        setAbsentMarkPayload({
          class_id: class_id,
          date: date_today,
          lecture: lecture_arr,
        })
      }

      resolve(1);
    });

    toast
      .promise(
        promise,
        {
          pending: "Saving ...",
          success: "Saved",
        },
        toastCompactTheme,
      )
      .catch((reason: string[]) => {
        for (let msg of reason) toast.error(msg, toastCompactTheme);
      });
  };

  const HandleMarkAbsent = async (dataSet : Set<string>) =>{
      const arr  = Array.from(dataSet);
      const arr_ids = arr.map((single)=>{
        return Number(JSON.parse(single).student_id)
      })
      if(!absentMarkPayload)
        return toast.error("Absent payload missing", toastCompactTheme);

    const promise = new Promise(async (resolve, reject) => {
      const response = await API_Attendance_Add_New_Bulk({
        student_id: arr_ids,
        date: absentMarkPayload.date,
        lectures: absentMarkPayload.lecture,
      });

      if (response.error) return reject(response.message);
      else if (response.data)
        return resolve(1);
    });

    toast
        .promise(
            promise,
            {
              pending: "Saving ...",
              success: "Saved",
            },
            toastCompactTheme,
        )
        .catch((reason: string[]) => {
          for (let msg of reason) toast.error(msg, toastCompactTheme);
        });
  }

  return (
    <div className={`flex w-full px-2 flex-col gap-6 h-fit`}>
      <div className={`text-2xl pt-4 flex justify-between`}>
        <span className={`font-semibold`}>Attendance</span>
      </div>

      <form
        className={`flex flex-col gap-2 justify-center items-center`}
        onSubmit={HandleSubmit}
      >
        <div className={`flex gap-2 w-full max-w-[800px] flex-wrap`}>
          <Select
            className={`min-w-[250px] flex-1`}
            size={"sm"}
            label={"Class"}
            labelPlacement={"outside"}
            placeholder={"Select"}
            name={"class"}
            isRequired
          >
            {classArr.map((item) => (
              <SelectItem key={JSON.stringify(item)}>
                {item.class_name}
              </SelectItem>
            ))}
          </Select>

          <Select
            className={`min-w-[250px] flex-1`}
            size={"sm"}
            label={"Lecture"}
            labelPlacement={"outside"}
            placeholder={"Select"}
            name={"lecture"}
            selectionMode={'multiple'}
            onSelectionChange={setLectureArr as any}
            isRequired
          >
            {["1", "2", "3", "4", "5", "6", "7", "8", "9", "ALL"].map(
              (item, index) => (
                <SelectItem key={item} textValue={item}>
                  {item}
                </SelectItem>
              ),
            )}
          </Select>

          <Select
            className={`min-w-[250px] flex-1`}
            size={"sm"}
            label={"Type"}
            labelPlacement={"outside"}
            placeholder={"Select"}
            name={"type"}
            isRequired
          >
            <SelectItem key={"ABSENT"} textValue={"ABSENT"}>
              ABSENT
            </SelectItem>
            <SelectItem key={"PRESENT"} textValue={"PRESENT"}>
              PRESENT
            </SelectItem>
          </Select>

          <DatePicker name={'date'} size={'sm'} />
        </div>

        <div>
          <Button
            type={"submit"}
            size={"sm"}
            variant={"solid"}
            color={"primary"}
          >
            Fetch
          </Button>
        </div>
      </form>

      {
        studentData.length > 0 ?
              attendanceType === "ABSENT" ?
                <AbsentAttendanceList data={studentData as AttendanceList[]}/>
              :
                <PresentAttendanceList handleMarkAbsent={HandleMarkAbsent} data={studentData as StudentClassList[]} />
            : "no data"
      }
    </div>
  );
};

export default Page;
