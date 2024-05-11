import React from "react";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className={`flex min-h-screen w-full justify-center items-center p-5`}>
      <div className={`flex justify-evenly items-center w-full flex-col md:flex-row gap-8`}>
        <div className={`flex flex-col gap-2 w-full max-w-[300px] justify-center text-center md:text-left md:justify-start`}>
          <span className={`font-semibold text-6xl`}>404</span>
          <span>Looks like you strayed too far</span>
          <span>
            Back to <Link href={'/'} className={`font-semibold text-primary`}> home </Link>{" "}
          </span>
        </div>
        <div className={`w-full flex justify-center max-w-[400px]`}>
          <img className={`w-[80%] md:w-full max-w-[400px]`} src={"/svg/not-found-1.svg"} alt="404"/>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
