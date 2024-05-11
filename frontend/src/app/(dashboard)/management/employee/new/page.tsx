import React from 'react';
import {redirect} from "next/navigation";
import {FetchParsedToken} from "../../../../../../helper/Token/jwt";
import New_Employee_Page from "../../../../../../components/dashboard/management/employee/new/New_Employee";

const Page = async () => {
    const data = await FetchParsedToken();
    if(!data)
      return redirect("/auth")

    if(!["MANAGEMENT","ADMIN"].includes(data.role))
      return redirect("/not-found")

    return <New_Employee_Page />;
};

export default Page;
