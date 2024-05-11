"use server";

import axios from "axios";
import { cookies } from "next/headers";
import { SimpleLog } from "@satvikshukla/beautify-console";

interface requestType {
  data: FormData;
}

interface responseType {
  error: boolean;
  data?: string;
  message?: string[];
  status_code: number;
}

const API_Employee_New = async (data: requestType): Promise<responseType> => {
  const cookieFactory = cookies();
  const accessToken = cookieFactory.get("accessToken")?.value;

  if (!accessToken)
    return {
      error: true,
      status_code: 401,
      message: ["SignIn again"],
    };

  try {
    SimpleLog.info(`[ CALLED ] : API_Employee_New :`);
    const response: responseType = await axios
      .postForm(process.env.BACKEND_URL + "/v1/employee/new", data.data, {
        headers: {
          authorization: accessToken,
        },
      })
      .then((res) => res.data);
    SimpleLog.info(
      `[ RETURN ] : API_Employee_New : ${JSON.stringify(response)}`,
    );
    return response;
  } catch (e: any) {
    SimpleLog.error(
      `[ ERROR ] : API_Employee_New : ${JSON.stringify(e.message)}`,
    );
    return {
      error: true,
      status_code: 501,
      message: ["Internal Server Error"],
    };
  }
};

export { API_Employee_New };
