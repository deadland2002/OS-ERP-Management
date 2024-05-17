"use client"

import React, {useEffect, useState} from 'react';
import {TimeTable_Class_UnInitialised} from "../../../../../helper/API/time_table/get_uninitialised_class";
import {toast} from "react-toastify";
import {toastCompactTheme} from "../../../../../Default/toast";
import {Button, Select, SelectItem} from "@nextui-org/react";
import {API_Class_Get_List, Class_Get_List_Type} from "../../../../../helper/API/class/get_class_list";
import {API_Class_Get_Student, StudentClassList} from "../../../../../helper/API/class/get_student_by_class";
import {API_Auth_Sign_Out} from "../../../../../helper/API/auth/sign_out";
import {API_Attendance_Add_New, API_Attendance_Add_New_Bulk} from "../../../../../helper/API/attendance/add_new";

const Page = () => {
    const [classArr, setClassArr] = useState<Class_Get_List_Type[]>([]);
    const [selectedClass, setSelectedClass] =
        useState<Class_Get_List_Type | null>(null);
    const [studentData,setStudentData] = useState<StudentClassList[]>([])

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


    const fetchData = (class_id: number) => {
        const promise = new Promise(async (resolve, reject) => {
            const response = await API_Class_Get_Student({class_id});
            if(response.message || !response.data) return reject(response.message);
            setStudentData(response.data);
            resolve(1);
        });
        toast
            .promise(
                promise,
                {
                    pending: "Fetching students...",
                    success: "Students fetched",
                },
                toastCompactTheme,
            )
            .catch((reason) => {
                for (const msg of reason) toast.error(msg, toastCompactTheme);
            });
    };

    useEffect(() => {
        if (selectedClass && selectedClass.class_id)
            fetchData(Number(selectedClass.class_id));
    }, [selectedClass]);


    const HandleSubmit = () =>{
        const elements_students : NodeListOf<HTMLInputElement> = document.querySelectorAll(".checkboxBtn")
        const elements_lectures : NodeListOf<HTMLInputElement> = document.querySelectorAll(".lectureChkBox")
        const filtered_students : number[] = [];
        let filtered_lectures : number[] = [];
        let date_today = (new Date()).toISOString();

        for(const element of elements_students){
            if(element.checked){
                const value = Number(element.getAttribute("data-id"));
                filtered_students.push(value);
            }
        }

        for(const element of elements_lectures){
            if(element.checked){
                const value = element.getAttribute("data-id");
                if(value && value==="ALL"){
                    filtered_lectures = [1,2,3,4,5,6,7,8]
                    break;
                }
                filtered_lectures.push(Number(value));
            }
        }

        const promise = new Promise(async (resolve, reject) => {
            const response = await API_Attendance_Add_New_Bulk({
                student_id:filtered_students,
                date:date_today,
                lectures:filtered_lectures,
            });

            if(response.error)
                reject(response.message);
            else
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

    }


    return (
        <div className={`flex w-full pl-4 flex-col gap-6`}>
            <div className={`text-2xl pt-4 flex justify-between`}>
                <span className={`font-semibold`}>Attendance</span>
            </div>

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

            {
                studentData.length >= 1 && (
                    <div className={`flex w-full justify-center flex-col items-center`}>

                        <div className={`py-2 flex flex-col gap-2 w-full max-w-[600px]`}>
                            <div className={`text-2xl font-semibold`}>
                                <span>Lectures</span>
                            </div>
                            <div className={`flex w-full justify-between`}>
                                {
                                    Array.from({length: 8}).map((_, index) => (
                                        <div className={`flex gap-1`} key={`lecture_select_${index}`}>
                                            <input type={'checkbox'}  className={`lectureChkBox`} data-id={index+1}/>
                                            <span>{index + 1}</span>
                                        </div>
                                    ))
                                }

                                <div className={`flex gap-1`}>
                                    <input type={'checkbox'} className={`lectureChkBox`} data-id={"ALL"}/>
                                    <span>All</span>
                                </div>
                            </div>
                        </div>

                        <div className={`flex flex-col w-fit min-w-[600px] gap-2 pb-10`}>
                            <div className={`flex justify-between bg-gray-100 rounded-md px-2 py-1 font-semibold`}>
                                <span className={`min-w-[50px]`}>ID</span>
                                <span className={`min-w-[100px]`}>Roll Number</span>
                                <span className={`w-[50px]`}>Image</span>
                                <span className={`min-w-[100px]`}>First Name</span>
                                <span className={`min-w-[100px]`}>Last Name</span>
                                <span className={`min-w-[50px]`}>Status</span>
                            </div>

                            {
                                studentData.map((item, index) => (
                                    <div key={`student-${index}`}
                                         className={`flex justify-between bg-gray-100 rounded-md px-2 py-1`}>
                                        <span className={`min-w-[50px]`}>{item.student_id}</span>
                                        <span className={`min-w-[100px]`}>{item.rollnumber}</span>
                                        <span className={`w-[50px]`}><a
                                            href={`http://localhost:3002${item.studentRelation.image_url}`}
                                            className={`text-blue-500`} target={'_blank'}>View</a></span>
                                        <span className={`min-w-[100px]`}>{item.first_name}</span>
                                        <span className={`min-w-[100px]`}>{item.last_name}</span>
                                        <span className={`min-w-[50px]`}>
                                    <input data-id={item.student_id} type={'checkbox'} className={`checkboxBtn`}/>
                                </span>
                                    </div>
                                ))
                            }
                        </div>

                        <Button className={``} size={'sm'} color={'primary'} onClick={HandleSubmit}>Submit</Button>
                    </div>
                )
            }
        </div>
    );
};

export default Page;
