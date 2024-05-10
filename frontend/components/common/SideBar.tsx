import React from 'react';
import {ParentLinkType} from "../../Static/links";
import Link from "next/link";

interface Props{
    links : ParentLinkType[]
}

const SideBar = (prop:Props) => {
    return (
        <div className={`flex flex-col px-2 flex-1 bg-gray-100 gap-2 border-r-2 max-w-[50px] overflow-hidden lg:max-w-[300px] lg:min-w-[200px]`}>

            <div className={`text-center pt-5 font-semibold`}>
                <span className={`hidden lg:flex`}>Welcome</span>
                <span className={`flex text-center justify-center lg:hidden`}>W</span>
            </div>

            <div className={`w-full flex flex-col gap-1 relative`}>
                {
                    prop.links.map((link)=>(
                        <Link href={link.path} key={link.path} className={`px-2 h-[40px] py-1 hover:bg-gray-200 rounded-md text-sm border-b-2 rounded-b-none text-gray-700 flex items-center gap-1`}>
                            {link.icon}
                            <span className={`hidden lg:flex`}>{link.title}</span>
                        </Link>
                    ))
                }
            </div>
        </div>
    );
};

export default SideBar;
