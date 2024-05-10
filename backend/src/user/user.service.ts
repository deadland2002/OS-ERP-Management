import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateUserDto, SignInUserDto } from './user.dto';
import { BasicResponse } from '../../interface/response/basic';
import * as bcrypt from 'bcrypt';
import * as process from 'node:process';
import { UserSignIn } from '../../interface/User/SignIn';
import { v4 as uuid4 } from 'uuid';
import errorHandler from '../../helper/errorHandler';
import stringToPassword from "../../helper/stringToPassword";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: CreateUserDto): Promise<BasicResponse> {
    try {
      data.password = await stringToPassword(data.password);
      console.log(data);
      const dbRes = await this.prisma.user.create({
        data,
      });
      console.log('data', dbRes);
      return {
        status: HttpStatus.CREATED,
        data: 'user created successfully',
        error: false,
      };
    } catch (err) {
      return errorHandler(err);
    }
  }

  async signIn(data: SignInUserDto): Promise<BasicResponse> {
    const dbRes = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (dbRes === null)
      return {
        status: HttpStatus.BAD_REQUEST,
        data: '',
        message: ['user not found'],
        error: true,
      };
    if (!(await bcrypt.compare(data.password, dbRes.password)))
      return {
        status: HttpStatus.BAD_REQUEST,
        data: '',
        message: ['password invalid'],
        error: true,
      };
    delete dbRes.password;
    const token = uuid4();
    const exp_at = Date.now() + 1 * 60 * 60 * 1000;

    try {
      const tokenExist = await this.prisma.token.findFirst({
        where: {
          user_id: dbRes.user_id,
        },
      });
      const tokenObj = {
        token: token,
        user_id: dbRes.user_id,
        role: dbRes.role,
        exp_At: new Date(exp_at),
        is_logged_out: false,
      };
      if (!tokenExist) {
        await this.prisma.token.create({
          data: tokenObj,
        });
      } else {
        await this.prisma.token.update({
          data: tokenObj,
          where: {
            user_id: dbRes.user_id,
          },
        });
      }
    } catch (err) {
      return errorHandler(err);
    }
    const result: UserSignIn = {
      ...dbRes,
      token: token,
      expiry: exp_at,
    };
    return { status: HttpStatus.OK, data: result, error: false };
  }

  async signOut(token: string): Promise<BasicResponse> {
    await this.prisma.token.update({
      data: {
        is_logged_out: true,
      },
      where: {
        token: token,
      },
    });
    return {
      status: HttpStatus.OK,
      data: 'logged out successfully',
      error: false,
    };
  }

  async getDetails(token: string): Promise<BasicResponse> {
    const result = await this.prisma.token
      .findFirst({
        where: {
          token: token,
        },
      })
      .user();

    if (result) {
      delete result.password;
      return {
        status: HttpStatus.OK,
        data: result,
        error: false,
      };
    }

    return {
      status: HttpStatus.NOT_FOUND,
      data: 'user not found',
      error: false,
    };
  }
}
