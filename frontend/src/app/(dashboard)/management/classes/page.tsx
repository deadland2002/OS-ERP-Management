import React from 'react';
import {redirect} from "next/navigation";
import {FetchParsedToken} from "../../../../../helper/Token/jwt";
import ClassListAll from "../../../../../components/dashboard/management/class/Class_List_All";
import {API_Class_Get_List} from "../../../../../helper/API/class/get_class_list";

const Page = async () => {
    const data = await FetchParsedToken();
    if(!data)
      return redirect("/auth")

    if(!["MANAGEMENT","ADMIN"].includes(data.role))
      return redirect("/not-found")

    const list = await API_Class_Get_List();
    if(!list || !list.data)
        return redirect("/not-found")

    return <ClassListAll classList={list.data} />;
};

export default Page;
