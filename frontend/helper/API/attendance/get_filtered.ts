"use server"

import axios from "axios";
import {cookies} from "next/headers";
import { SimpleLog } from "@satvikshukla/beautify-console";
import {StudentClassList} from "../class/get_student_by_class";

interface requestType{
    class_id : number
    date : string
    lecture : number[]
    type : "ABSENT" | "PRESENT"
}

export interface AttendanceList {
    date : string
    lecture : number
    student_id : number
    is_blocked : string
    block_reason : string
    teacher_id : number
    student_relation:{
        first_name : string
        last_name : string
    }
}

interface responseType{
    error: boolean,
    data ?: StudentClassList[] | AttendanceList[],
    message ?: string[],
    status_code: number
}

const API_Attendance_Get_Filtered = async (data:requestType) : Promise<responseType> =>{
    const cookieFactory = cookies()
    const accessToken = cookieFactory.get("accessToken")?.value;

    if(!accessToken)
        return {
            error : true,
            status_code: 401,
            message : ["SignIn again"]
        }

    try{
        SimpleLog.info(`[ CALLED ] : API_Attendance_Get_Filtered : ${JSON.stringify(data)}`)
        const response:responseType =  await axios.get(process.env.BACKEND_URL + "/v1/attendance/get_attendance_filtered",{
            data:data,
            headers:{
                authorization: accessToken,
            }
        }).then(res => res.data);
        SimpleLog.info(`[ RETURN ] : API_Attendance_Get_Filtered : ${JSON.stringify(response)}`)
        return  response;
    }catch (e){
        SimpleLog.error(`[ ERROR ] : API_Attendance_Get_Filtered : ${JSON.stringify(e)}`)
        return {
            error : true,
            status_code : 501,
            message : ["Internal Server Error"]
        }
    }
}

export {API_Attendance_Get_Filtered}
