"use server"

import axios from "axios";
import {cookies} from "next/headers";
import { SimpleLog } from "@satvikshukla/beautify-console";

interface requestType{
}

interface AllSubjects{
    subject_id: number
    subject_name : string
    subject_code : string
}

interface responseType{
    error: boolean,
    data ?: AllSubjects[],
    message ?: string[],
    status_code: number
}

const API_Get_All_Subjects = async () : Promise<responseType> =>{
    const cookieFactory = cookies()
    const accessToken = cookieFactory.get("accessToken")?.value;

    if(!accessToken)
        return {
            error : true,
            status_code: 401,
            message : ["SignIn again"]
        }

    try{
        SimpleLog.info(`[ CALLED ] : API_Get_All_Subjects :`)
        const response:responseType =  await axios.get(process.env.BACKEND_URL + "/v1/subject/get_all", {
            headers:{
                authorization: accessToken,
            }
        }).then(res => res.data);
        SimpleLog.info(`[ RETURN ] : API_Get_All_Subjects : ${JSON.stringify(response)}`)
        return  response;
    }catch (e){
        SimpleLog.error(`[ ERROR ] : API_Get_All_Subjects : ${JSON.stringify(e)}`)
        return {
            error : true,
            status_code : 501,
            message : ["Internal Server Error"]
        }
    }
}

export type {AllSubjects as All_Subjects_Type}

export {API_Get_All_Subjects}
