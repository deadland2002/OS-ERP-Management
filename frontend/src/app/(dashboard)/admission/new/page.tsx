import React from 'react';
import New_Admission_Page from "../../../../../components/dashboard/admission/new/new_admission";
import {FetchParsedToken} from "../../../../../helper/Token/jwt";
import {redirect} from "next/navigation";

const Page = async () => {
    const data = await FetchParsedToken();
    if(!data)
      return redirect("/auth")

    if(!["MANAGEMENT","ADMIN"].includes(data.role))
      return redirect("/not-found")

    return <New_Admission_Page />;
};

export default Page;
