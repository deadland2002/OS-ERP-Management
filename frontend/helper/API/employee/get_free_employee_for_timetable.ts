"use server"

import axios from "axios";
import {cookies} from "next/headers";
import { SimpleLog } from "@satvikshukla/beautify-console";

interface requestType{
    lecture : number
    day : "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY";
}

interface TeacherList{
    id : number
    name : string
}

interface responseType{
    error: boolean,
    data ?: TeacherList[],
    message ?: string[],
    status_code: number
}

const API_TimeTable_Get_FreeTeachers = async (data:requestType) : Promise<responseType> =>{
    const cookieFactory = cookies()
    const accessToken = cookieFactory.get("accessToken")?.value;

    if(!accessToken)
        return {
            error : true,
            status_code: 401,
            message : ["SignIn again"]
        }

    try{
        SimpleLog.info(`[ CALLED ] : API_TimeTable_Get_FreeTeachers :`)
        const response:responseType =  await axios.get(process.env.BACKEND_URL + "/v1/employee/get_free_employee_for_timetable", {
            data:data,
            headers:{
                authorization: accessToken,
            }
        }).then(res => res.data);
        SimpleLog.info(`[ RETURN ] : API_TimeTable_Get_FreeTeachers : ${JSON.stringify(response)}`)
        return  response;
    }catch (e){
        SimpleLog.error(`[ ERROR ] : API_TimeTable_Get_FreeTeachers : ${JSON.stringify(e)}`)
        return {
            error : true,
            status_code : 501,
            message : ["Internal Server Error"]
        }
    }
}

export type {TeacherList as TimeTable_Get_FreeTeachers_Type}

export {API_TimeTable_Get_FreeTeachers}
