"use client";

import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { toastCompactTheme } from "../../../../Default/toast";
import { Button } from "@nextui-org/react";
import { API_Get_TimeTable_By_Teacher } from "../../../../helper/API/time_table/get_timetable_by_teacher";

interface classTimeTable {
  [id: string]: [
    {
      day:
        | "MONDAY"
        | "TUESDAY"
        | "WEDNESDAY"
        | "THURSDAY"
        | "FRIDAY"
        | "SATURDAY"
        | "SUNDAY";
      lecture: number;
      teacher_name: string;
      subject_name: string;
      class_name: string;
    }[],
  ];
}

interface indexToDaysInterface {
  [id: number]: string;
}

const TimeTableByTeacher = () => {
  const [timeTable, setTimeTable] = React.useState<classTimeTable | null>(null);

  const indexToDays: indexToDaysInterface = {
    0: "MONDAY",
    1: "TUESDAY",
    2: "WEDNESDAY",
    3: "THURSDAY",
    4: "Friday",
    5: "SATURDAY",
  };

  let d = new Date();
  let formatted = d.toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
  const todayIndex = new Date(formatted).getDay();

  const getData = async () => {
    const promise = new Promise(async (resolve, rej) => {
      const response = await API_Get_TimeTable_By_Teacher();
      if (response.message || !response.data) return rej(response.message);

      const ans: any = {};

      for (const keys of Object.keys(response.data)) {
        ans[keys] = {};
        for (const day of [
          "MONDAY",
          "TUESDAY",
          "WEDNESDAY",
          "THURSDAY",
          "FRIDAY",
          "SATURDAY",
        ]) {
          ans[keys][day] = [[], [], [], [], [], [], [], []];
        }
      }

      for (const key of Object.keys(response.data)) {
        const arr = response.data[key];

        for (const fields of arr) {
          ans[key][fields.day][fields.lecture - 1] = {
            day: fields.day,
            lecture: fields.lecture,
            teacher_name: fields.teacher_name,
            subject_name: fields.subject_name,
            class_name: fields.class_name,
          };
        }
      }

      setTimeTable(ans);

      resolve(response);
    });
    await toast
      .promise(
        promise,
        {
          pending: "Fetching Timetable ...",
          success: "Timetable fetched",
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

  if (!timeTable)
    return (
      <div className={`flex flex-col`}>
        <div>No timetable available</div>
      </div>
    );

  console.log(timeTable);
  return (
    <div className={`flex flex-col`}>
      <div
        className={`w-[calc(100vw-250px)] overflow-auto min-h-[calc(100vh-250px)]`}
      >
        <div className={`min-w-[1250px]`}>
          <div className={`w-full flex flex-col gap-10 pb-5`}>
            {Object.keys(timeTable).map((key, index1) => (
              <div key={`${key}_${index1}`} className={`flex flex-col gap-2`}>
                <span
                  className={`font-semibold text-lg px-2 py-1 rounded-md bg-amber-100 w-fit`}
                >
                  {key}
                </span>
                {Object.keys(timeTable[key]).map((item, index2: number) => (
                  <div
                    key={`${key}_${index1}_${index2}`}
                    className={`flex gap-4`}
                  >
                    <div
                      className={`bg-blue-100 ${index2 + 1 === todayIndex ? "bg-red-100" : ""} text-sm rounded-md w-[120px] min-h-[60px] flex justify-center items-center font-semibold`}
                    >
                      <span>{item}</span>
                    </div>
                    {timeTable[key][item as any].map((single, index3) => (
                      <div
                        key={`${key}_${index1}_${index2}_${index3}`}
                        className={`flex bg-blue-100 ${index2 + 1 === todayIndex ? "bg-red-100" : ""} text-sm rounded-md w-[120px] min-h-[60px] p-1 flex-col text-center justify-between`}
                      >
                        <span>{single.subject_name}</span>
                        <span>{single.class_name}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeTableByTeacher;
