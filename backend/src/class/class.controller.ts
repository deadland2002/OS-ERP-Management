import {
    Controller,
    Post,
    Body, Get,
} from '@nestjs/common';
import {BasicResponse} from "../../interface/response/basic";
import {ClassService} from "./class.service";
import {CreateUserDto, SignInUserDto} from "../user/user.dto";

@Controller()
export class ClassController {
    constructor(
        private readonly classService: ClassService,
    ) {}

    @Post('class')
    async signUpUser(@Body() userData: CreateUserDto,
    ): Promise<{}> {
        return {}
    }

    @Get('class')
    async signInUser(@Body() userData: SignInUserDto,
    ): Promise<{}> {
        return {}
    }
}
