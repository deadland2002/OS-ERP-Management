"use server"

import axios from "axios";
import {cookies} from "next/headers";
import { SimpleLog } from "@satvikshukla/beautify-console";
import {SaveToken} from "../../Token/jwt";

interface requestType{
    email:string,
    password:string
}

export interface UserSignInReturn{
    user_id : string
    name : string
    email : string
    mobileNo : string
    role : string
    token : string
    expiry:string
}

interface responseType{
    error: boolean,
    data ?: UserSignInReturn,
    message ?: string[],
    status_code: number
}

const API_Auth_SignIn = async (data:requestType) : Promise<responseType> =>{
    try{

        SimpleLog.info(`[ CALLED ] : API_Auth_HandleSignIn : ${JSON.stringify(data)}`)
        const response:responseType =  await axios.post(process.env.BACKEND_URL + "/v1/user/signIn", data).then(res => res.data);
        SimpleLog.info(`[ RETURN ] : API_Auth_HandleSignIn : ${JSON.stringify(response)}`)
        if(response.error === false && response.data){
            const cookieFactory = cookies()
            const expiryDate = new Date(response.data.expiry);
            cookieFactory.set("accessToken",response.data.token , {
                expires : expiryDate
            })
            await SaveToken(response.data);
        }
        return  response;
    }catch (e){
        SimpleLog.error(`[ ERROR ] : API_Auth_HandleSignIn : ${JSON.stringify(e)}`)
        return {
            error : true,
            status_code : 501,
            message : ["Internal Server Error"]
        }
    }
}

export {API_Auth_SignIn}
