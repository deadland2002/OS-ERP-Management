"use server"

import axios from "axios";
import {cookies} from "next/headers";
import { SimpleLog } from "@satvikshukla/beautify-console";

interface requestType{
}

interface UnAssignedCoordinatorList{
    employee_id : number
    first_name : string
    last_name : string
}

interface responseType{
    error: boolean,
    data ?: UnAssignedCoordinatorList[],
    message ?: string[],
    status_code: number
}

const API_UnAssigned_Coordinator_List = async () : Promise<responseType> =>{
    const cookieFactory = cookies()
    const accessToken = cookieFactory.get("accessToken")?.value;

    if(!accessToken)
        return {
            error : true,
            status_code: 401,
            message : ["SignIn again"]
        }

    try{
        SimpleLog.info(`[ CALLED ] : API_UnAssigned_Coordinator_List :`)
        const response:responseType =  await axios.get(process.env.BACKEND_URL + "/v1/employee/get_unassigned_coordinator", {
            headers:{
                authorization: accessToken,
            }
        }).then(res => res.data);
        SimpleLog.info(`[ RETURN ] : API_UnAssigned_Coordinator_List : ${JSON.stringify(response)}`)
        return  response;
    }catch (e){
        SimpleLog.error(`[ ERROR ] : API_UnAssigned_Coordinator_List : ${JSON.stringify(e)}`)
        return {
            error : true,
            status_code : 501,
            message : ["Internal Server Error"]
        }
    }
}

export type {UnAssignedCoordinatorList as UnAssigned_Coordinator_List}

export {API_UnAssigned_Coordinator_List}
