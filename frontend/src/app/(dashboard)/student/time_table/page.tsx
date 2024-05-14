import React from "react";
import {redirect} from "next/navigation";
import {API_Get_Student_Specific_Timetable} from "../../../../../helper/API/time_table/get_student_personal_timetable";

const Page = async () => {
    const response = await API_Get_Student_Specific_Timetable();

    if (!response.data || response.error) {
        return redirect("/404");
    }

    const ans: (any[])[] = [
        [[], [], [], [], [], [], [], []],
        [[], [], [], [], [], [], [], []],
        [[], [], [], [], [], [], [], []],
        [[], [], [], [], [], [], [], []],
        [[], [], [], [], [], [], [], []],
        [[], [], [], [], [], [], [], []],
    ];

    const days: Record<string, number> = {
        MONDAY: 0,
        TUESDAY: 1,
        WEDNESDAY: 2,
        THURSDAY: 3,
        FRIDAY: 4,
        SATURDAY: 5,
    };

    const class_info = response.data.class_data;
    const arr = response.data.table_data;

    for (const fields of arr) {
        ans[days[fields.day]][fields.lecture - 1] = {
            day: fields.day,
            lecture: fields.lecture,
            teacher_name: fields.teacher_name,
            subject_name: fields.subject_name,
        };
    }

    let d = new Date();
    let formatted = d.toLocaleString("en-US", {timeZone: "Asia/Kolkata"});
    const todayIndex = new Date(formatted).getDay();

    const indexToDays: Record<number, string> = {
        0: "MONDAY",
        1: "TUESDAY",
        2: "WEDNESDAY",
        3: "THURSDAY",
        4: "Friday",
        5: "SATURDAY",
    };

    return (
        <div className={`flex flex-col gap-4`}>

      <span
          className={`font-semibold text-lg px-2 py-1 rounded-md bg-amber-100 w-fit`}
      >
            {class_info.class_name}
          </span>

            <div
                className={`w-[calc(100vw-80px)] lg:w-[calc(100vw-250px)] overflow-auto min-h-[calc(100vh-250px)]`}
            >
                <div className={`flex flex-col gap-2`}>
                    <div className={`min-w-[1250px]`}>
                        <div className={`flex flex-col gap-2`}>
                            {ans.map((item, index: number) => (
                                <div key={`${index}`} className={`flex gap-4`}>
                                    <div
                                        className={`bg-blue-100 ${index + 1 === todayIndex ? "bg-red-100" : ""} text-sm rounded-md w-[120px] min-h-[60px] flex justify-center items-center font-semibold`}
                                    >
                                        <span>{indexToDays[index]}</span>
                                    </div>
                                    {item.map((single, index2) => (
                                        <div
                                            key={`${index}_${index2}`}
                                            className={`flex bg-blue-100 ${index + 1 === todayIndex ? "bg-red-100" : ""} text-sm rounded-md w-[120px] min-h-[60px] p-1 flex-col text-center justify-between`}
                                        >
                                            <span>{single.subject_name}</span>
                                            <span>{single.teacher_name}</span>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
