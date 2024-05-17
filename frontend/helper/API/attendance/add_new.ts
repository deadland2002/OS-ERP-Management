"use server"

import axios from "axios";
import {cookies} from "next/headers";
import { SimpleLog } from "@satvikshukla/beautify-console";

interface requestType{
    student_id : number[]
    date : string
    lectures : number[]
}

interface responseType{
    error: boolean,
    data ?: string,
    message ?: string[],
    status_code: number
}

const API_Attendance_Add_New_Bulk = async (data:requestType) : Promise<responseType> =>{
    const cookieFactory = cookies()
    const accessToken = cookieFactory.get("accessToken")?.value;

    if(!accessToken)
        return {
            error : true,
            status_code: 401,
            message : ["SignIn again"]
        }

    try{
        SimpleLog.info(`[ CALLED ] : API_Attendance_Add_New_Bulk :`)
        const response:responseType =  await axios.post(process.env.BACKEND_URL + "/v1/attendance/create_bulk",data,{
            headers:{
                authorization: accessToken,
            }
        }).then(res => res.data);
        SimpleLog.info(`[ RETURN ] : API_Attendance_Add_New_Bulk : ${JSON.stringify(response)}`)
        return  response;
    }catch (e){
        SimpleLog.error(`[ ERROR ] : API_Attendance_Add_New_Bulk : ${JSON.stringify(e)}`)
        return {
            error : true,
            status_code : 501,
            message : ["Internal Server Error"]
        }
    }
}

export {API_Attendance_Add_New_Bulk}
