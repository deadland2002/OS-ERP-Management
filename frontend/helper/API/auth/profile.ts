"use server"

import axios from "axios";
import {cookies} from "next/headers";
import { SimpleLog } from "@satvikshukla/beautify-console";
import {RolesTypes} from "../../../Static/links";

interface requestType{}

interface responseType{
    error: boolean,
    data ?: {
        user_id : string
        name : string
        email : string
        mobileNo : string
        role : RolesTypes["roles"]
    },
    message ?: string[],
    status_code: number
}

const API_Auth_Profile = async () : Promise<responseType> =>{

    const cookieFactory = cookies()
    const accessToken = cookieFactory.get("accessToken")?.value;

    if(!accessToken)
        return {
            error : true,
            status_code: 401,
            message : ["SignIn again"]
        }

    try{
        SimpleLog.info(`[ CALLED ] : API_Auth_Profile :`)
        const response:responseType =  await axios.get(process.env.BACKEND_URL + "/v1/user/details", {
            headers:{
                authorization: accessToken,
            }
        }).then(res => res.data);
        SimpleLog.info(`[ RETURN ] : API_Auth_Profile : ${JSON.stringify(response)}`)
        return  response;
    }catch (e){
        SimpleLog.error(`[ ERROR ] : API_Auth_Profile : ${JSON.stringify(e)}`)
        return {
            error : true,
            status_code : 501,
            message : ["Internal Server Error"]
        }
    }
}

export {API_Auth_Profile}
