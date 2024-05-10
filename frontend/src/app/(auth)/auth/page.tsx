"use client"

import React from "react";
import {toast} from "react-toastify";
import {toastCompactTheme} from "../../../../Default/toast";

const Page = () => {

  const HandleSignIn = () =>{
    console.log("ok")
    toast.success("signed in",toastCompactTheme);
  }

  return (
    <div className={`w-full flex h-screen`}>
      <div className={`w-1/2 flex justify-center items-center bg-gray-50`}>
        <div
          className={`flex flex-col justify-center max-w-[400px] w-full min-w-[300px] rounded-lg shadow-lg shadow-blue-100 bg-white gap-6 p-8`}
        >
          <div className={`text-center flex flex-col gap-2 font-semibold`}>
            <span className={`text-4xl`}>Sign In</span>
            <span className={``}>sign In to your account</span>
          </div>

            <div className={`w-full flex flex-col`}>
            <span className={`text-sm text-gray-500`}>Email</span>
            <input className={`bg-gray-100 outline-0 py-1 rounded-md px-2`} placeholder={`test@example.com`} />
          </div>

          <div className={`w-full flex flex-col`}>
            <span className={`text-sm text-gray-500`}>Password</span>
            <input className={`bg-gray-100 outline-0 py-1 rounded-md px-2`} placeholder={`******`} />
          </div>

            <button onClick={HandleSignIn} className={`px-2 py-1 bg-blue-500 rounded-md font-semibold text-white`}>Sign In</button>
        </div>
      </div>

      <div className={`w-1/2 signInGrad flex justify-center items-center`}>
        <div
          className={`flex flex-col justify-center max-w-[350px] text-center text-white font-semibold gap-2`}
        >
          <span className={`text-4xl`}>Welcome Back</span>
          <span className={`text-lg`}>
            Simply signin to your account by filling credentials and clicking on
            signin button
          </span>
        </div>
      </div>
    </div>
  );
};

export default Page;
