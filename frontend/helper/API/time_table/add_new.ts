"use server"

import axios from "axios";
import {cookies} from "next/headers";
import { SimpleLog } from "@satvikshukla/beautify-console";

interface requestType{
    class_id : number
    subject_id : number
    teacher_id : number
    subject_name : string
    teacher_name : string
    days : "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY";
    lecture : number
    class_name : string
}

interface responseType{
    error: boolean,
    data ?: string,
    message ?: string[],
    status_code: number
}

const API_TimeTable_Add_New = async (data:requestType) : Promise<responseType> =>{
    const cookieFactory = cookies()
    const accessToken = cookieFactory.get("accessToken")?.value;

    if(!accessToken)
        return {
            error : true,
            status_code: 401,
            message : ["SignIn again"]
        }

    try{
        SimpleLog.info(`[ CALLED ] : API_TimeTable_Add_New :`)
        const response:responseType =  await axios.post(process.env.BACKEND_URL + "/v1/timetable/create",data,{
            headers:{
                authorization: accessToken,
            }
        }).then(res => res.data);
        SimpleLog.info(`[ RETURN ] : API_TimeTable_Add_New : ${JSON.stringify(response)}`)
        return  response;
    }catch (e){
        SimpleLog.error(`[ ERROR ] : API_TimeTable_Add_New : ${JSON.stringify(e)}`)
        return {
            error : true,
            status_code : 501,
            message : ["Internal Server Error"]
        }
    }
}

export type {requestType as API_Class_Add_New_Req}

export {API_TimeTable_Add_New}
