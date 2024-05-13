import React, { useEffect } from "react";
import TimeTableFetchData from "./TimeTable_FetchData";
import {
  All_Subjects_Type,
  API_Get_All_Subjects,
} from "../../../../helper/API/subject/subject_get_all";
import { API_Get_Class_UnInitialised_Timetable } from "../../../../helper/API/time_table/get_uninitialised_class";
import { toast } from "react-toastify";
import { toastCompactTheme } from "../../../../Default/toast";
import TimeTableDeleteData from "./TimeTable_DeleteData";

interface TableProp {
  isFilled: boolean;
  teacher_id: number;
  subject_id: number;
  teacher_name: string;
  subject_name: string;
  lecture: number;
  day: "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY";
}

interface Prop {
  dataArr: TableProp[][];
  class_name: string;
  class_id: number;
  onChange: (data: TableProp) => void;
}

const TimeTableChangeable = (prop: Prop) => {
  const [optionalMount, setOptionalMount] = React.useState(<></>);
  const [subjectArr, setSubjectArr] = React.useState<All_Subjects_Type[]>([]);

  const getData = async () => {
    const promise = new Promise(async (resolve, rej) => {
      const response = await API_Get_All_Subjects();
      if (response.message || !response.data) return rej(response.message);
      setSubjectArr(response.data);
      resolve(response);
    });
    await toast
      .promise(
        promise,
        {
          pending: "Fetching subjects ...",
          success: "Subjects fetched",
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

  const daysName: Record<number, string> = {
    0: "MONDAY",
    1: "TUESDAY",
    2: "WEDNESDAY",
    3: "THURSDAY",
    4: "FRIDAY",
    5: "SATURDAY",
  };

  const HandleLeave = () => {
    setOptionalMount(<></>);
  };

  const onHover = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    data: TableProp,
  ) => {
    const element = event.target as HTMLDataElement;
    const bounding = element.getBoundingClientRect();
    console.log(bounding);
    const formattedX = event.clientX - 100;
    const formattedY = event.clientY - 50;

    if (data.isFilled)
      setOptionalMount(
        <TimeTableDeleteData
          onChange={prop.onChange}
          onLeave={HandleLeave}
          key={`${formattedX}_${formattedY}`}
          posX={formattedX}
          posY={formattedY}
          subjects={subjectArr}
          class_name={prop.class_name}
          class_id={prop.class_id}
          cellData={data}
        />,
      );
    else
      setOptionalMount(
        <TimeTableFetchData
            class_name={prop.class_name}
            onChange={prop.onChange}
            onLeave={HandleLeave}
            key={`${formattedX}_${formattedY}`}
            posX={formattedX}
            posY={formattedY}
            class_id={prop.class_id}
            subjects={subjectArr}
            cellData={data}
        />,
      );
  };

  return (
    <div className={`flex flex-col gap-2`}>
      <span className={`bg-amber-100 px-2 py-2 rounded-md w-fit`}>
        {prop.class_name}
      </span>

      {optionalMount}

      <div
        className={`max-w-[calc(100vw-100px)] lg:max-w-[calc(100vw-300px)] overflow-auto`}
      >
        <div className={`flex flex-col gap-2 min-w-[1000px] pb-10`}>
          {prop.dataArr.map((item, index: number) => (
            <div key={`${index}`} className={`flex gap-2`}>
              <div
                className={`bg-purple-100 font-semibold rounded-md min-w-[120px] min-h-[80px] flex flex-col justify-center items-center`}
              >
                {daysName[index]}
              </div>
              {item.map((single, index2: number) => (
                <div
                  onClick={(e) => {
                    onHover(e, single);
                  }}
                  key={`${index}_${index2}`}
                  className={`p-2 text-sm bg-blue-100 ${single.isFilled ? "bg-green-100" : ""} rounded-md w-[120px] h-[80px] flex flex-col justify-between`}
                >
                  <span className={`text-xs`}>{single.teacher_name}</span>
                  <span className={``}>{single.subject_name}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimeTableChangeable;
