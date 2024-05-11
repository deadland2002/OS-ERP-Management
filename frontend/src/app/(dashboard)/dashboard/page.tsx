import React from 'react';
import {API_Auth_Profile} from "../../../../helper/API/auth/profile";
import {redirect} from "next/navigation";

const Page = async () => {
    const response = await API_Auth_Profile();

    if(response.error || !response.data)
        return redirect("/auth");

    return (
        <div className={`flex w-full flex-col`}>
            <div className={`pl-4 pt-4 font-semibold text-2xl`}>
                <span>Welcome</span>
            </div>
            <div className={`flex justify-center w-full `}>
                <div className={`text-sm flex flex-col gap-2`}>
                    <img
                        src={
                            response.data.image_url
                                ? process.env.BACKEND_URL + response.data.image_url
                                : ""
                        }
                        className={`border-2 border-dashed border-gray-200 w-[200px] aspect-[3/4] object-cover rounded-md`}
                    />
                    <div className={`flex flex-col`}>
                        <span className={`font-semibold`}>Name</span>
                        <span className={`bg-gray-100 px-2 rounded-md py-1`}>{response.data.name}</span>
                    </div>
                    <div className={`flex flex-col`}>
                        <span className={`font-semibold`}>Email</span>
                        <span className={`bg-gray-100 px-2 rounded-md py-1`}>{response.data.email}</span>
                    </div>
                    <div className={`flex flex-col`}>
                        <span className={`font-semibold`}>Mobile</span>
                        <span className={`bg-gray-100 px-2 rounded-md py-1`}>{response.data.mobileNo}</span>
                    </div>
                    <div className={`flex flex-col`}>
                        <span className={`font-semibold`}>Designation</span>
                        <span className={`bg-gray-100 px-2 rounded-md py-1`}>{response.data.role}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
