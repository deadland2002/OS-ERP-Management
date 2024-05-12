"use client"

import React, {useEffect} from 'react';
import TimeTableByClass from "../../../../../components/dashboard/management/time_table/TimeTable_By_Class";

const Page = () => {
    const [selectedCategory, setSelectedCategory] = React.useState<"CLASS"|"TEACHER"|"">("");
    const [optionalMounted, setOptionalMounted] = React.useState(<></>);

    useEffect(() => {
        if(selectedCategory==="CLASS")
            setOptionalMounted(<TimeTableByClass />)
    }, [selectedCategory]);

    return (
        <div className={`flex w-full pl-4 flex-col gap-6`}>
            <div className={`text-2xl pt-4 flex justify-between`}>
                <span className={`font-semibold`}>Time Table</span>
            </div>

            <div className={`flex gap-4`}>
                <span onClick={()=>{setSelectedCategory("CLASS")}} className={`cursor-pointer bg-gray-100 rounded-md px-2 py-1 text-sm ${selectedCategory === "CLASS" ? "bg-blue-100":""}`}>Class</span>
                <span onClick={()=>{setSelectedCategory("TEACHER")}} className={`cursor-pointer bg-gray-100 rounded-md px-2 py-1 text-sm ${selectedCategory === "TEACHER" ? "bg-blue-100":""}`}>Teacher</span>
            </div>

            {optionalMounted}
        </div>
    );
};

export default Page;
