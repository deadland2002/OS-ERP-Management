import React from 'react';
import {AttendanceList} from "../../../helper/API/attendance/get_filtered";
import {Chip} from "@nextui-org/chip";
interface Props{
    data: AttendanceList[]
}

const AbsentAttendanceList = (prop:Props) => {
    return (
        <div className={`w-full flex justify-center`}>
            <div className={`w-full flex max-w-[900px] flex-col gap-2`}>
                <div className={`flex w-full flex-wrap bg-gray-100 rounded-md px-2 py-1 justify-between font-semibold`}>
                    <span className={`min-w-[150px]`}>DATE</span>
                    <span className={`min-w-[100px]`}>LECTURE</span>
                    <span className={`min-w-[120px]`}>IS BLOCKED</span>
                    <span className={`min-w-[200px]`}>BLOCK REASON</span>
                    <span className={`min-w-[200px]`}>NAME</span>
                </div>

                {
                    prop.data.map((single, index) => (
                        <div key={`${single.student_id}_${index}`}
                             className={`flex w-full flex-wrap bg-gray-100 rounded-md px-2 py-1 justify-between`}>
                            <span className={`min-w-[150px]`}>{single.date}</span>
                            <span className={`min-w-[100px]`}>{single.lecture}</span>
                            <span className={`min-w-[120px]`}>{single.is_blocked ?
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
