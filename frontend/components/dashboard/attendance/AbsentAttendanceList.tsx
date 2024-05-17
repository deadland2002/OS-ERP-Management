import React from 'react';
import {AttendanceList} from "../../../helper/API/attendance/get_filtered";
import {Chip} from "@nextui-org/chip";
interface Props{
    data: AttendanceList[]
}

const AbsentAttendanceList = (prop:Props) => {
    return (
        <div className={`w-full flex justify-center pb-10`}>
            <div className={`w-full flex max-w-[1000px] flex-col gap-2`}>
                <div className={`flex w-full flex-wrap bg-gray-100 rounded-md px-2 py-1 justify-between font-semibold`}>
                    <span className={`min-w-[100px]`}>ID</span>
                    <span className={`min-w-[100px]`}>DATE</span>
                    <span className={`min-w-[100px]`}>LECTURE</span>
                    <span className={`min-w-[100px]`}>IS BLOCKED</span>
                    <span className={`min-w-[200px]`}>BLOCK REASON</span>
                    <span className={`min-w-[200px]`}>NAME</span>
                </div>

                {
                    prop.data.map((single, index) => (
                        <div key={`${single.student_id}_${index}`}
                             className={`flex w-full flex-wrap bg-gray-100 rounded-md px-2 py-1 justify-between`}>
                            <span className={`min-w-[100px]`}>{single.student_id}</span>
                            <span className={`min-w-[100px]`}>{single.date}</span>
                            <span className={`min-w-[100px]`}>{single.lecture}</span>
                            <span className={`min-w-[100px]`}>{single.is_blocked ?
                                <Chip size={'sm'} variant={'flat'} color={'danger'}>BLOCKED</Chip> :
                                <Chip size={'sm'} variant={'flat'} color={'success'}>NORMAL</Chip>}</span>
                            <span className={`min-w-[200px] max-w-[200px] line-clamp-2`}>{single.block_reason}</span>
                            <span
                                className={`min-w-[200px]`}>{single.student_relation.first_name + " " + single.student_relation.last_name}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default AbsentAttendanceList;
