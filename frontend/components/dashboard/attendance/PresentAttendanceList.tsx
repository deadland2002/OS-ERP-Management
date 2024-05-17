import React from 'react';
import {StudentClassList} from "../../../helper/API/class/get_student_by_class";
import {Button} from "@nextui-org/react";

interface Props{
    data: StudentClassList[],
    handleMarkAbsent : (data: Set<string>) => void
}
const PresentAttendanceList = (prop:Props) => {

    const [absentArray, setAbsentArray] = React.useState<Set<string>>(new Set([]));
    const HandleClick = (e:React.MouseEvent<HTMLInputElement>) =>{
        const input = e.target as HTMLInputElement;
        const id = input.getAttribute("data-id")
        const name = input.getAttribute("data-name")
        if(!id || !name)
            return

        if(input.checked){
            setAbsentArray(prev => {
                prev.add(JSON.stringify({
                    student_id:Number(id),
                    student_name:name
                }))
                return new Set(prev);
            })
        }else{
            setAbsentArray(prev => {
                prev.delete(JSON.stringify({
                    student_id:Number(id),
                    student_name:name
                }))
                return new Set(prev);
            })
        }

        console.log(absentArray)
    }
    return (
        <div className={`w-full flex justify-center flex-col items-center gap-4`}>
            <div className={`w-full flex max-w-[600px] flex-col gap-2`}>
                <div className={`flex w-full flex-wrap bg-gray-100 rounded-md px-2 py-1 justify-between font-semibold`}>
                    <span className={`min-w-[50px]`}>ID</span>
                    <span className={`min-w-[100px]`}>ROLL</span>
                    <span className={`min-w-[200px]`}>NAME</span>
                    <span className={`min-w-[50px]`}></span>
                </div>

                {
                    prop.data.map((single, index) => (
                        <label key={`${single.student_id}_${index}`} htmlFor={`checkbox_${index+1}`}
                             className={`flex w-full flex-wrap bg-gray-100 rounded-md px-2 py-1 justify-between`}>
                            <span className={`min-w-[50px]`}>{single.student_id}</span>
                            <span className={`min-w-[100px]`}>{single.rollnumber}</span>
                            <span
                                className={`min-w-[200px]`}>{single.first_name + " " + single.last_name}</span>
                            <span className={`min-w-[50px]`}>
                                <input id={`checkbox_${index+1}`} data-name={single.first_name + " " + single.last_name} data-id={single.student_id} onClick={HandleClick} className={`min-w-[20px]`} type={'checkbox'}/>
                            </span>
                        </label>
                    ))
                }
            </div>

            {
                absentArray.size >= 1 && <Button size={'sm'} variant={'solid'} color={'primary'} onClick={()=>{prop.handleMarkAbsent(absentArray)}}>Mark Absent</Button>
            }
        </div>
    );
};

export default PresentAttendanceList;
