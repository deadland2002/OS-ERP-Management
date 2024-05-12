"use server"

import axios from "axios";
import {cookies} from "next/headers";
import { SimpleLog } from "@satvikshukla/beautify-console";

interface requestType{
}

interface ArrayType{
    class_id : number
    class_name : string
}

interface responseType{
    error: boolean,
    data ?: ArrayType[],
    message ?: string[],
    status_code: number
}

const API_Get_Class_UnInitialised_Timetable = async () : Promise<responseType> =>{
    const cookieFactory = cookies()
    const accessToken = cookieFactory.get("accessToken")?.value;

    if(!accessToken)
        return {
            error : true,
            status_code: 401,
            message : ["SignIn again"]
        }

    try{
        SimpleLog.info(`[ CALLED ] : API_Get_Class_UnInitialised_Timetable :`)
        const response:responseType =  await axios.get(process.env.BACKEND_URL + "/v1/timetable/get_empty_class", {
            headers:{
                authorization: accessToken,
            }
        }).then(res => res.data);
        SimpleLog.info(`[ RETURN ] : API_Get_Class_UnInitialised_Timetable : ${JSON.stringify(response)}`)
        return  response;
    }catch (e){
        SimpleLog.error(`[ ERROR ] : API_Get_Class_UnInitialised_Timetable : ${JSON.stringify(e)}`)
        return {
            error : true,
            status_code : 501,
            message : ["Internal Server Error"]
        }
    }
}

export type {ArrayType as TimeTable_Class_UnInitialised}

export {API_Get_Class_UnInitialised_Timetable}
