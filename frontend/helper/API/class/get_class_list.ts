"use server"

import axios from "axios";
import {cookies} from "next/headers";
import { SimpleLog } from "@satvikshukla/beautify-console";

interface requestType{
}

export interface ClassList{
    class_id : number
    class_name : string
    capacity : number
    coordinator : number | null
    fees_per_month : string
}

interface responseType{
    error: boolean,
    data ?: ClassList[],
    message ?: string[],
    status_code: number
}

const API_Class_Get_List = async () : Promise<responseType> =>{
    const cookieFactory = cookies()
    const accessToken = cookieFactory.get("accessToken")?.value;

    if(!accessToken)
        return {
            error : true,
            status_code: 401,
            message : ["SignIn again"]
        }

    try{
        SimpleLog.info(`[ CALLED ] : API_Class_Get_List :`)
        const response:responseType =  await axios.get(process.env.BACKEND_URL + "/v1/class/get_all", {
            headers:{
                authorization: accessToken,
            }
        }).then(res => res.data);
        SimpleLog.info(`[ RETURN ] : API_Class_Get_List : ${JSON.stringify(response)}`)
        return  response;
    }catch (e){
        SimpleLog.error(`[ ERROR ] : API_Class_Get_List : ${JSON.stringify(e)}`)
        return {
            error : true,
            status_code : 501,
            message : ["Internal Server Error"]
        }
    }
}

export type {ClassList as Class_Get_List_Type}

export {API_Class_Get_List}
