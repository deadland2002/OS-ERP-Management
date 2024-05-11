"use server";

import {UserSignInReturn} from "../API/auth/signin";
import * as JWT from "jsonwebtoken";
import {cookies} from "next/headers";
import {RolesTypes} from "../../Static/links";

interface JWT_TOKEN_RETURN{
    user_id : number
    name : string
    email : string
    mobileNo : string
    role : RolesTypes["roles"]
    token : string
}

const GetToken = async (data: UserSignInReturn) : Promise<string | false> => {
    try {
        return JWT.sign(
            {
                user_id: data.user_id,
                name: data.name,
                email: data.email,
                mobileNo: data.mobileNo,
                role: data.role,
                token: data.token,
            },
            process.env.FRONTEND_SECRET as string,
        ) as string;
    } catch (err) {
        return false
    }
};

const SaveToken = async (data: UserSignInReturn) => {
    try {
        const dataReturn = await GetToken(data);
        if (dataReturn){
            const cookieFactory = cookies()
            const expiryDate = new Date(data.expiry);
            cookieFactory.set("frontendToken",dataReturn , {
                expires : expiryDate
            })
            return true
        }
        return false
    } catch (err) {
        return false
    }
};

const FetchToken = async () => {
    try {
        const cookieFactory = cookies()
        const token = cookieFactory.get("frontendToken")?.value;

        if(!token)
            return false

        return token
    } catch (err) {
        return false
    }
};

const FetchParsedToken = async () => {
    try {
        const token = await FetchToken();
        if(!token)
            return false
        const parsed_data = await ParseToken(token);
        if(!parsed_data)
            return false

        return parsed_data as JWT_TOKEN_RETURN
    } catch (err) {
        return false
    }
};


const ParseToken = async (token: string) => {
    try {
        return JWT.verify(token, process.env.FRONTEND_SECRET as string) as JWT_TOKEN_RETURN;
    } catch (err) {
        return false
    }
}

export {GetToken, ParseToken , FetchParsedToken , SaveToken , FetchToken};
