import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {ROLES_KEY} from "./role.decorator";
import {Request} from "express";
import {PrismaService} from "../prisma.service";
import {Role} from "./role.enum";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector,private prisma: PrismaService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true;
        }
        const request = context.switchToHttp().getRequest() as Request;
        const authToken = request.headers.authorization

        if(!authToken)
            return false;

        const dbRes = await this.prisma.token.findFirst({
            where:{
                token : authToken
            }
        })

        if(!dbRes)
            return false;

        if(dbRes.is_logged_out)
            return false;

        return requiredRoles.some((role) => dbRes.role.includes(role));
    }
}
