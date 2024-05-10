import React, {PropsWithChildren} from 'react';
import {API_Auth_Profile} from "../../../helper/API/auth/profile";
import {redirect} from "next/navigation";
import {GetUserLinkByLevel} from "../../../Static/links";
import SideBar from "../../../components/common/SideBar";
import TopBar from "../../../components/common/TopBar";

const Layout = async ({children}:PropsWithChildren) => {
    const response = await API_Auth_Profile();

    if(response.error || !response.data)
        return redirect("/auth");

    const links = GetUserLinkByLevel(response.data.role)

    return (
        <div className={`flex flex-1 h-screen w-full`}>
            <div className={`flex`}>
                <SideBar links={links}/>
            </div>
            <div className={`flex flex-col w-full`}>
                <TopBar name={response.data.name}/>
                <div className={`flex flex-1 p-2 h-[calc(100vh-41px)] overflow-auto`}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Layout;
