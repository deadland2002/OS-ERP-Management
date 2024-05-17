"use server"

import axios from "axios";
import {cookies} from "next/headers";
import { SimpleLog } from "@satvikshukla/beautify-console";

interface requestType{
    class_id:number
}

export interface StudentClassList{
    first_name : string,
    last_name : string,
    student_id : number,
    rollnumber : string | null,
    studentRelation:{
        image_url:string
    }
}

interface responseType{
    error: boolean,
    data ?: StudentClassList[],
    message ?: string[],
    status_code: number
}

const API_Class_Get_Student = async (data:requestType) : Promise<responseType> =>{
    const cookieFactory = cookies()
    const accessToken = cookieFactory.get("accessToken")?.value;

    if(!accessToken)
        return {
            error : true,
            status_code: 401,
            message : ["SignIn again"]
        }

    try{
        SimpleLog.info(`[ CALLED ] : API_Class_Get_Student :`)
        const response:responseType =  await axios.get(process.env.BACKEND_URL + "/v1/class/get_student_by_class", {
            data:data,
            headers:{
                authorization: accessToken,
            }
        }).then(res => res.data);
        SimpleLog.info(`[ RETURN ] : API_Class_Get_Student : ${JSON.stringify(response)}`)
        return  response;
    }catch (e){
        SimpleLog.error(`[ ERROR ] : API_Class_Get_Student : ${JSON.stringify(e)}`)
        return {
            error : true,
            status_code : 501,
            message : ["Internal Server Error"]
        }
    }
}

export type {StudentClassList as Class_Get_Student_Type}

export {API_Class_Get_Student}
