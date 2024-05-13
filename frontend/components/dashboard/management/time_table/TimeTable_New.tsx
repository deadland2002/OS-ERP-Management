"use client";

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { toastCompactTheme } from "../../../../Default/toast";
import { Button, Select, Selection, SelectItem } from "@nextui-org/react";
import { API_Get_TimeTable_By_Teacher } from "../../../../helper/API/time_table/get_timetable_by_teacher";
import {
  API_Get_Class_UnInitialised_Timetable,
  TimeTable_Class_UnInitialised,
} from "../../../../helper/API/time_table/get_uninitialised_class";
import TimeTableChangeable from "./TimeTable_Changeable";
import {structuredClone} from "next/dist/compiled/@edge-runtime/primitives";
import {TimeTablecellTypes} from "./TimeTable_Edit";


const TimeTableNew = () => {
  const [classArr, setClassArr] = useState<TimeTable_Class_UnInitialised[]>([]);
  const [selectedClass, setSelectedClass] =
    useState<TimeTable_Class_UnInitialised | null>(null);
  const [arrOfTimeTable, setArrOfTimeTable] = useState<TimeTablecellTypes[][] | [][]>(
    [],
  );

  const getData = async () => {
    const promise = new Promise(async (resolve, rej) => {
      const response = await API_Get_Class_UnInitialised_Timetable();
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
    const time = setTimeout(getData, 500);
    return () => clearTimeout(time);
  }, []);

  useEffect(() => {
    const arr: any[] = [];

    const daysName : Record<number, string> = {
      0: "MONDAY",
      1: "TUESDAY",
      2: "WEDNESDAY",
      3: "THURSDAY",
      4: "FRIDAY",
      5: "SATURDAY",
    };

    for (const days of [1, 2, 3, 4, 5, 6]) {
      arr.push([[], [], [], [], [], [], [], []]);
      for (const cells of [1, 2, 3, 4, 5, 6, 7, 8]) {
        arr[days - 1][cells - 1] = {
          teacher_id: "",
          subject_id: "",
          teacher_name: "",
          subject_name: "",
          isFilled: false,
          lecture: cells,
          day: daysName[days-1],
        };
      }
    }

    setArrOfTimeTable(arr);
    console.log(arr)
  }, []);

  const HandleAdd = (data:TimeTablecellTypes) =>{
    const days : Record<string, number> =  {
      MONDAY : 0,
      TUESDAY : 1,
      WEDNESDAY : 2,
      THURSDAY : 3,
      FRIDAY : 4,
      SATURDAY : 5,
    }

      const clone = JSON.parse(JSON.stringify(arrOfTimeTable));
      clone[days[data.day]][data.lecture-1] = data;

      setArrOfTimeTable(clone);
  }

  if (!selectedClass)
    return (
      <div className={`flex flex-col`}>
        <div className={`justify-start`}>
          <Select
            size={"sm"}
            label={"Class"}
            labelPlacement={"outside"}
            placeholder={"Select"}
            onSelectionChange={(value: any) => {
              setSelectedClass(JSON.parse(value.currentKey));
            }}
          >
            {classArr.map((item) => (
              <SelectItem key={JSON.stringify(item)}>
                {item.class_name}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>
    );

  return <TimeTableChangeable onChange={HandleAdd} dataArr={arrOfTimeTable} class_name={selectedClass.class_name} class_id={selectedClass.class_id} />;
};

export default TimeTableNew;
