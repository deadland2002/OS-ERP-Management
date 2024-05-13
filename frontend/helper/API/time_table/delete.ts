"use server"

import axios from "axios";
import {cookies} from "next/headers";
import { SimpleLog } from "@satvikshukla/beautify-console";

interface requestType{
    teacher_id : number
    days : "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY";
    lecture : number
}

interface responseType{
    error: boolean,
    data ?: string,
    message ?: string[],
    status_code: number
}

const API_TimeTable_Delete = async (data:requestType) : Promise<responseType> =>{
    const cookieFactory = cookies()
    const accessToken = cookieFactory.get("accessToken")?.value;

    if(!accessToken)
        return {
            error : true,
            status_code: 401,
            message : ["SignIn again"]
        }

    try{
        SimpleLog.info(`[ CALLED ] : API_TimeTable_Delete :`)
        const response:responseType =  await axios.delete(process.env.BACKEND_URL + "/v1/timetable/delete",{
            data:data,
            headers:{
                authorization: accessToken,
            }
        }).then(res => res.data);
        SimpleLog.info(`[ RETURN ] : API_TimeTable_Delete : ${JSON.stringify(response)}`)
        return  response;
    }catch (e){
        SimpleLog.error(`[ ERROR ] : API_TimeTable_Delete : ${JSON.stringify(e)}`)
        return {
            error : true,
            status_code : 501,
            message : ["Internal Server Error"]
        }
    }
}

export {API_TimeTable_Delete}
