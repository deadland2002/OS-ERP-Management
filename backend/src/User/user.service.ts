import {HttpStatus, Injectable} from '@nestjs/common';
import {PrismaService} from '../prisma.service';
import {CreateUserDto, SignInUserDto} from "./user.dto";
import {BasicResponse} from "../../interface/response/basic";
import {PrismaClientKnownRequestError} from "@prisma/client/runtime/library";
import * as bcrypt from 'bcrypt';
import * as process from "node:process";
import {UserSignIn} from "../../interface/User/SignIn";
import {v4 as uuid4} from "uuid"

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async createUser(data: CreateUserDto): Promise<BasicResponse> {
        try{
            const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS))
            data.password = await bcrypt.hash(data.password, salt)

            console.log(data)

            const dbRes =  await this.prisma.user.create({
                data,
            });

            console.log("data",dbRes)

            return {status: HttpStatus.CREATED, data:dbRes , error:false};

        }catch (err){
            // console.log(err)
            if(err instanceof PrismaClientKnownRequestError){
                if(err.code === "P2002" ){
                    const arrOfTarget = err.meta.target as string[];
                    const result : string[] = [];
                    for(let target of arrOfTarget)
                        result.push(`${target} already exists`);
                    return {status: HttpStatus.BAD_REQUEST , data: {} ,
                        message:result ,error:true};
                }else if(err.code === "P2003"){
                    return {status: HttpStatus.BAD_REQUEST , data: {} ,
                        message:[`values does not satisfy relation`] ,error:true};
                }else{
                    return {status: HttpStatus.BAD_REQUEST , data: {} ,
                        message:[`unhandled  for code : ${err.code}`] ,error:true};
                }
            }else{
                return {status: HttpStatus.INTERNAL_SERVER_ERROR , data: {} ,
                    message:["Internal server error"] ,error:true};
            }
        }
    }


    async getUser(data: SignInUserDto): Promise<BasicResponse> {
        const dbRes = await this.prisma.user.findUnique({
            where: {
                email : data.email
            }
        });

        if(dbRes === null)
            return {status: HttpStatus.BAD_REQUEST, data:"" ,message:["User not found"], error:true};

        if(! await bcrypt.compare(data.password,dbRes.password) )
            return {status: HttpStatus.BAD_REQUEST,data:"", message:["password invalid"], error:true};

        delete dbRes.password;

        const token = uuid4();

        try{
            const tokenExist = await this.prisma.token.findFirst({
                where:{
                    userId : dbRes.id
                }
            })

            const exp_at = Date.now() + 1 * 60 * 60 * 1000;
            const tokenObj = {
                token : token,
                userId : dbRes.id,
                role: dbRes.role,
                exp_At: new Date(exp_at)
            }

            if(!tokenExist){
                const tokenRes = await this.prisma.token.create({
                    data:tokenObj
                });
            }else{
                const tokenRes = await this.prisma.token.update({
                    data:tokenObj
                    ,where:{
                        userId : dbRes.id
                    }
                })
            }
        }catch (err){
            return {status: HttpStatus.INTERNAL_SERVER_ERROR ,data:"", message:["Try again"], error:true};
        }

        const result: UserSignIn = {
            ...dbRes,
            token: token
        }

        return {status: HttpStatus.OK, data:result, error:false};
    }
}
