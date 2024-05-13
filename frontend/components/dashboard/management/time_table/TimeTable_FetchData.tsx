import React, {FormEvent, useEffect} from 'react';
import {Button, Select, SelectItem, Spinner} from "@nextui-org/react";
import {
    API_TimeTable_Get_FreeTeachers,
    TimeTable_Get_FreeTeachers_Type
} from "../../../../helper/API/employee/get_free_employee_for_timetable";
import {All_Subjects_Type} from "../../../../helper/API/subject/subject_get_all";
import {API_TimeTable_Add_New} from "../../../../helper/API/time_table/add_new";
import {TimeTablecellTypes} from "./TimeTable_Edit";

interface Props{
    posX : number,
    posY : number,
    subjects: All_Subjects_Type[]
    onLeave: ()=>void
    onChange : (data:TimeTablecellTypes) =>void
    class_id : number,
    class_name:string,
    cellData:TimeTablecellTypes
}

const TimeTableFetchData = (prop:Props) => {
    const [isFetching,setIsFetching] = React.useState<boolean>(true);
    const [isSubmitting,setIsSubmitting] = React.useState<boolean>(false);
    const [isSuccess,setIsSuccess] = React.useState<boolean>(false);
    const [teacherArray, setTeacherArray] = React.useState<TimeTable_Get_FreeTeachers_Type[]>([]);

    const getData = async () => {
        const response = await API_TimeTable_Get_FreeTeachers({
            day:prop.cellData.day,
            lecture:prop.cellData.lecture,
        });
        if (response.message || !response.data) return;
        setTeacherArray(response.data);
        setIsFetching(false)
    };


    useEffect(() => {
        getData();
    }, []);

    const HandleSubmit = async (event:FormEvent<HTMLFormElement>) =>{
        event.preventDefault()
        setIsSubmitting(true);

        const form = event.target as HTMLFormElement;
        const data = new FormData(form);
        const sub_sep = (data.get("subject") as string).split(" : ");
        const sub_id = Number(sub_sep[sub_sep.length - 1]);
        const sub_name = sub_sep[0];
        const tea_sep = (data.get("teacher") as string).split(" : ");
        const tea_id = Number(tea_sep[tea_sep.length - 1]);
        const tea_name = tea_sep[0];
        const obj = {
            class_id : prop.class_id ,
            subject_id : sub_id,
            teacher_id : tea_id ,
            subject_name : sub_name ,
            teacher_name : tea_name ,
            days : prop.cellData.day ,
            lecture : prop.cellData.lecture ,
            class_name : prop.class_name ,
        }

        try{
            console.log(obj)
            const response = await API_TimeTable_Add_New(obj);
            if(response.message || !response.data) return;
            setIsSuccess(true)
            const { days , ...rest } = obj;
            const all_data = {
                ...rest,
                teacher_name: tea_name + " : " + tea_id,
                day : obj.days,
                isFilled:true
            }
            prop.onChange(all_data)
        }catch(error){
            console.log(error)
        }finally {
            setIsSubmitting(false);
        }
    }

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

    if (isFetching) {
      return (
        <div
          className={`bg-white min-w-[250px] min-h-[100px] rounded-md absolute shadow-2xl p-4 flex justify-center items-center animate-appearance-in`}
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

    if(teacherArray.length == 0){
        return <div className={`bg-white min-w-[250px] min-h-[100px] rounded-md absolute shadow-2xl p-4 flex justify-center items-center animate-appearance-in`}
                    style={{
                        left:prop.posX,
                        top:prop.posY,
                    }}
                    onMouseLeave={prop.onLeave}>
            No Teacher Available
        </div>
    }

    return (
      <div
        className={`bg-white min-w-[250px] min-h-[100px] rounded-md absolute shadow-2xl p-4 animate-appearance-in`}
        style={{
          left: prop.posX,
          top: prop.posY,
        }}
        onMouseLeave={prop.onLeave}
      >
        <form className={`flex flex-col gap-2`} onSubmit={HandleSubmit}>
            <Select labelPlacement={"outside-left"} placeholder={"Subject"} size={"sm"} aria-label={"Subject"} name={`subject`}>
                {
                    prop.subjects.map((item) => (<SelectItem key={item.subject_name+ " : " +item.subject_id}>{item.subject_name+ " : " +item.subject_id}</SelectItem>))
                }
            </Select>
            <Select labelPlacement={"outside-left"} placeholder={"Teacher"} size={"sm"} aria-label={"Teacher"} name={`teacher`}>
                {
                    teacherArray.map((item) => (<SelectItem key={item.name}>{item.name}</SelectItem>))
                }
            </Select>
            <Button type={'submit'} size={'sm'} variant={'flat'} color={'primary'} isLoading={isSubmitting}>Submit</Button>
        </form>
      </div>
    );
};

export default TimeTableFetchData;
