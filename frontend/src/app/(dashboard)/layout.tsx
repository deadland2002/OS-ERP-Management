import React, {PropsWithChildren} from 'react';
import {redirect} from "next/navigation";
import {GetUserLinkByLevel} from "../../../Static/links";
import SideBar from "../../../components/common/SideBar";
import TopBar from "../../../components/common/TopBar";
import {FetchParsedToken, SaveToken} from "../../../helper/Token/jwt";

const Layout = async ({children}:PropsWithChildren) => {
    const data = await FetchParsedToken();

    if(!data)
        return redirect("/auth");

    const links = GetUserLinkByLevel(data.role)

    return (
        <div className={`flex flex-1 h-screen w-full`}>
            <div className={`flex`}>
                <SideBar links={links}/>
            </div>
            <div className={`flex flex-col w-full`}>
                <TopBar name={data.name}/>
                <div className={`flex flex-1 p-2 h-[calc(100vh-41px)] overflow-auto`}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Layout;
