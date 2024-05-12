"use client"

import React from "react";
import { ClassList } from "../../../../helper/API/class/get_class_list";
import {Button} from "@nextui-org/react";
import NewClassModal from "./New_Class_Modal";

interface Props {
  classList: ClassList[];
}

const ClassListAll = (prop: Props) => {
  const[optionalMount,setOptionalMount] = React.useState(<></>);

  const closeModal = () =>{
    setOptionalMount(<></>)
  }

  const HandleNewClass = () =>{
    setOptionalMount(<NewClassModal closeModal={closeModal} />)
  }

  return (
    <div className={`flex w-full flex-col gap-6`}>

      {optionalMount}

      <div className={`pl-4 pt-4 flex justify-between`}>
        <span className={`font-semibold`}>Class List</span>
        <Button variant={"solid"} size={'sm'} color={'primary'} onClick={HandleNewClass}>
          New
        </Button>
      </div>
      <div className={`max-w-[calc(100vw-100px)] lg:max-w-[calc(100vw-250px)] overflow-auto min-h-[calc(100vh-150px)]`}>
        <div className={`flex items-center flex-col w-[1100px] gap-2`}>
          <div className={`flex gap-2 w-full font-semibold bg-blue-50 rounded-md px-2 py-1`}>
            <span className={`min-w-[50px]`}>S No.</span>
            <span className={`min-w-[150px]`}>Class Name</span>
            <span className={`min-w-[100px]`}>Class Cap.</span>
            <span className={`min-w-[100px]`}>Coordinator</span>
            <span className={`min-w-[100px]`}>Fee PM</span>
            <span className={`min-w-[150px]`}>Start Date</span>
            <span className={`min-w-[150px]`}>End Date</span>
            <span className={`min-w-[100px]`}>Total Mon.</span>
            <span className={`min-w-[100px]`}>Total Lec.</span>
          </div>
          <div
              className={`rounded-md w-full flex justify-center flex-col`}
          >
            {prop.classList.map((item: ClassList, index) => (
                <div key={item.class_id} className={`flex gap-2 w-full bg-gray-50 hover:bg-blue-100 px-2 py-1`}>
                  <span className={`min-w-[50px]`}>{index + 1}</span>
                  <span className={`min-w-[150px]`}>{item.class_name}</span>
                  <span className={`min-w-[100px]`}>{item.capacity}</span>
                  <span className={`min-w-[100px]`}>{item.coordinator}</span>
                  <span className={`min-w-[100px]`}>{item.fees_per_month}</span>
                  <span className={`min-w-[150px]`}>
                {item.start_date ? item.start_date.split("T")[0] : "NA"}
              </span>
                  <span className={`min-w-[150px]`}>
                {item.end_date ? item.end_date.split("T")[0] : "NA"}
              </span>
                  <span className={`min-w-[100px]`}>{item.total_months}</span>
                  <span className={`min-w-[100px]`}>{item.total_lectures}</span>
                </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassListAll;
