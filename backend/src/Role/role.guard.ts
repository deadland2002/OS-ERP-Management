import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './role.decorator';
import { Request } from 'express';
import { PrismaService } from '../prisma.service';
import { Role } from './role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // check if required roles array is passed or not
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest() as Request;
    const authToken = request.headers.authorization;

    // check for authorization token
    if (!authToken) return false;

    const dbRes = await this.prisma.token.findFirst({
      where: {
        token: authToken,
      },
    });

    // check if token is found in database
    if (!dbRes) return false;

    // check if user is already logged out
    if (dbRes.is_logged_out) return false;

    // Do not check roles if all no role is passed
    if (requiredRoles.length === 0) return true;

    // match the role of user against passed roles
    return requiredRoles.some((role) => dbRes.role.includes(role));
  }
}
