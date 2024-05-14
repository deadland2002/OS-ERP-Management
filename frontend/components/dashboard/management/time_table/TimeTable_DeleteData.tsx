import React, { FormEvent, useEffect } from "react";
import { Button, Select, SelectItem, Spinner } from "@nextui-org/react";
import { All_Subjects_Type } from "../../../../helper/API/subject/subject_get_all";
import { TimeTablecellTypes } from "./TimeTable_Edit";
import { API_TimeTable_Delete } from "../../../../helper/API/time_table/delete";

interface Props {
  posX: number;
  posY: number;
  subjects: All_Subjects_Type[];
  onLeave: () => void;
  onChange: (data: TimeTablecellTypes) => void;
  class_id: number;
  class_name: string;
  cellData: TimeTablecellTypes;
}

const TimeTableDeleteData = (prop: Props) => {
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const [isSuccess, setIsSuccess] = React.useState<boolean>(false);

  const HandleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    const obj = {
      teacher_id: prop.cellData.teacher_id,
      days: prop.cellData.day,
      lecture: prop.cellData.lecture,
    };
    try {
      console.log(obj);
      const response = await API_TimeTable_Delete(obj);
      if (response.message || !response.data) return;
      setIsSuccess(true);
      const { days, ...rest } = obj;
      const all_data = {
        isFilled: false,
        teacher_id: 0,
        subject_id: 0,
        teacher_name: "",
        subject_name: "",
        lecture: prop.cellData.lecture,
        day: prop.cellData.day,
      };
      prop.onChange(all_data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div
        className={`bg-white text-2xl text-success min-w-[250px] min-h-[100px] rounded-md absolute shadow-2xl p-4 flex justify-center items-center animate-appearance-in`}
        style={{
          left: prop.posX,
          top: prop.posY,
        }}
        onMouseLeave={prop.onLeave}
      >
        <i className="fi fi-rs-badge-check"></i>
      </div>
    );
  }

  if (isSubmitting) {
    return (
      <div
        className={`bg-white text-2xl text-success min-w-[250px] min-h-[100px] rounded-md absolute shadow-2xl p-4 flex justify-center items-center animate-appearance-in`}
        style={{
          left: prop.posX,
          top: prop.posY,
        }}
        onMouseLeave={prop.onLeave}
      >
        <Spinner size={"sm"} />
      </div>
    );
  }

  return (
    <div
      className={`bg-white text-2xl text-success min-w-[250px] min-h-[100px] rounded-md absolute shadow-2xl p-4 flex justify-center items-center animate-appearance-in`}
      style={{
        left: prop.posX,
        top: prop.posY,
      }}
      onMouseLeave={prop.onLeave}
    >
      <form
        className={`flex flex-col gap-2 justify-center items-center`}
        onSubmit={HandleSubmit}
      >
        <Button
          type={"submit"}
          size={"sm"}
          variant={"flat"}
          color={"danger"}
          isLoading={isSubmitting}
        >
          Reset
        </Button>
      </form>
    </div>
  );
};

export default TimeTableDeleteData;
