import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { HttpStatus } from '@nestjs/common';

function handleError(err: Error) {
  if (err instanceof PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      const arrOfTarget = err.meta.target as string[];
      const result: string[] = [];
      for (const target of arrOfTarget) result.push(`${target} already exists`);
      return {
        status: HttpStatus.BAD_REQUEST,
        data: {},
        message: result,
        error: true,
      };
    } else if (err.code === 'P2003') {
      return {
        status: HttpStatus.BAD_REQUEST,
        data: {},
        message: [`values does not satisfy relation`],
        error: true,
      };
    }
  } else {
    return {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      data: {},
      message: ['Internal server error'],
      error: true,
    };
  }

  return {
    status: HttpStatus.BAD_REQUEST,
    data: {},
    message: [`unhandled  for code : ${err.code}`],
    error: true,
  };
}

export default handleError;
