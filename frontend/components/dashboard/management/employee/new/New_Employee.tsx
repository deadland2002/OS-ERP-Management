"use client";

import React, {FormEvent, useEffect} from "react";
import {toast} from "react-toastify";
import {Autocomplete, AutocompleteItem, Button} from "@nextui-org/react";
import {API_Class_Get_List, Class_Get_List_Type} from "../../../../../helper/API/class/get_class_list";
import {toastCompactTheme} from "../../../../../Default/toast";
import {API_Admission_New} from "../../../../../helper/API/admission/admission_new";
import ImageUpload from "../../../../common/ImageUpload";

const New_Employee_Page = () => {
    const [studentImage, setStudentImage] = React.useState<File | null>(null);

    const HandleChangeImage = (file: File) => {
        setStudentImage(file);
    };

    const HandleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

    };

    return (
        <div className={`flex w-full flex-col`}>
            <span className={`font-semibold`}>Add New Student</span>
            <div
                className={`border-gray-300 p-2 rounded-md w-full flex justify-center`}
            >
                <form
                    className={`w-full text-sm flex max-w-[700px] gap-4 flex-col`}
                    onSubmit={HandleSubmit}
                >
                    <div
                        className={`flex gap-4 w-full flex-col md:flex-row md:items-start items-center`}
                    >
                        <div
                            className={`min-w-[200px] w-[200px] h-[250px] border-2 border-purple-300 rounded-md border-dashed`}
                        >

                            <ImageUpload
                                onAdd={HandleChangeImage}
                                file={studentImage}
                                name={"student_image"}
                            />
                        </div>

                        <div className={`flex flex-col gap-2 justify-between w-full`}>
                            <div className={`flex w-full gap-2 justify-between flex-wrap`}>
                                <div
                                    className={`flex w-full flex-col max-w-[300px] gap-1 flex-1 min-w-[100px]`}
                                >
                                    <span>First Name</span>
                                    <input
                                        defaultValue={"xyz"}
                                        name={"first_name"}
                                        className={`bg-gray-100 w-full rounded-md px-2 py-1 outline-0`}
                                    />
                                </div>

                                <div
                                    className={`flex w-full flex-col max-w-[300px] gap-1 flex-1 min-w-[100px]`}
                                >
                                    <span>Middle Name</span>
                                    <input
                                        defaultValue={""}
                                        name={"middle_name"}
                                        className={`bg-gray-100 w-full rounded-md px-2 py-1 outline-0`}
                                    />
                                </div>

                                <div
                                    className={`flex w-full flex-col max-w-[300px] gap-1 flex-1 min-w-[100px]`}
                                >
                                    <span>Last Name</span>
                                    <input
                                        defaultValue={"pqr"}
                                        name={"last_name"}
                                        className={`bg-gray-100 w-full rounded-md px-2 py-1 outline-0`}
                                    />
                                </div>
                            </div>

                            <div
                                className={`flex flex-col w-full gap-2 justify-between flex-wrap`}
                            >
                                <div className={`flex w-full flex-col gap-1`}>
                                    <span>Mobile No.</span>
                                    <input
                                        defaultValue={"9999999999"}
                                        name={"mobile_no"}
                                        className={`bg-gray-100 w-full rounded-md px-2 py-1 outline-0`}
                                    />
                                </div>
                                <div className={`flex w-full flex-col gap-1`}>
                                    <span>Email</span>
                                    <input
                                        defaultValue={"test@gmail.com"}
                                        name={"email"}
                                        className={`bg-gray-100 w-full rounded-md px-2 py-1 outline-0`}
                                    />
                                </div>
                            </div>

                            <div className={`flex w-full gap-2 justify-between flex-wrap`}>
                                <div
                                    className={`flex w-full flex-col gap-1 min-w-[150px] flex-1`}
                                >
                                    <span>Father Name</span>
                                    <input
                                        defaultValue={"john doe"}
                                        name={"father_name"}
                                        className={`bg-gray-100 w-full rounded-md px-2 py-1 outline-0`}
                                    />
                                </div>
                                <div
                                    className={`flex w-full flex-col gap-1 min-w-[150px] flex-1`}
                                >
                                    <span>Mother Name</span>
                                    <input
                                        defaultValue={"emily"}
                                        name={"mother_name"}
                                        className={`bg-gray-100 w-full rounded-md px-2 py-1 outline-0`}
                                    />
                                </div>
                            </div>

                            <div className={`flex w-full gap-2 justify-between flex-wrap`}>
                                <div
                                    className={`flex w-full flex-col gap-1 min-w-[150px] flex-1`}
                                >
                                    <span>Alternate No.</span>
                                    <input
                                        defaultValue={"8888888888"}
                                        name={"alternate_number"}
                                        className={`bg-gray-100 w-full rounded-md px-2 py-1 outline-0`}
                                    />
                                </div>
                                <div
                                    className={`flex w-full flex-col gap-1 min-w-[150px] flex-1`}
                                >
                                    <span>DOB</span>
                                    <input
                                        required
                                        defaultValue={""}
                                        type={"datetime-local"}
                                        name={"date_of_birth"}
                                        className={`bg-gray-100 w-full rounded-md px-2 py-1 outline-0`}
                                    />
                                </div>
                            </div>

                            <div className={`flex w-full gap-2 justify-between flex-wrap`}>
                                <div className={`flex w-full flex-col gap-1`}>
                                    <span>Address</span>
                                    <input
                                        defaultValue={
                                            "24234 sdfjhsdfjks fjksdhfskjdfs dsjhdfkjsdh fdsdf"
                                        }
                                        name={"address"}
                                        className={`bg-gray-100 w-full rounded-md px-2 py-1 outline-0`}
                                    />
                                </div>
                            </div>

                            <div className={`flex w-full gap-2 justify-between flex-wrap`}>
                                <div
                                    className={`flex w-full flex-col gap-1 min-w-[150px] flex-1`}
                                >
                                    <span>City</span>
                                    <input
                                        defaultValue={"wkajsdnakj"}
                                        name={"city"}
                                        className={`bg-gray-100 w-full rounded-md px-2 py-1 outline-0`}
                                    />
                                </div>

                                <div
                                    className={`flex w-full flex-col gap-1 min-w-[150px] flex-1`}
                                >
                                    <span>State</span>
                                    <input
                                        defaultValue={"sdkjnfksjdf"}
                                        name={"state"}
                                        className={`bg-gray-100 w-full rounded-md px-2 py-1 outline-0`}
                                    />
                                </div>
                            </div>

                            <div className={`flex w-full gap-2 justify-between flex-wrap`}>
                                <div
                                    className={`flex w-full flex-col gap-1 min-w-[150px] flex-1`}
                                >
                                    <span>Pincode</span>
                                    <input
                                        defaultValue={"888888"}
                                        name={"pincode"}
                                        className={`bg-gray-100 w-full rounded-md px-2 py-1 outline-0`}
                                    />
                                </div>

                                <div
                                    className={`flex w-full flex-col gap-1 min-w-[150px] flex-1`}
                                >
                                    <span>Country code</span>
                                    <input
                                        defaultValue={"99"}
                                        name={"country_code"}
                                        className={`bg-gray-100 w-full rounded-md px-2 py-1 outline-0`}
                                    />
                                </div>
                            </div>

                            <div className={`flex w-full gap-2 justify-between flex-wrap`}>
                                <div
                                    className={`flex w-full flex-col gap-1 min-w-[150px] flex-1`}
                                >
                                    <span>Guardian Name</span>
                                    <input
                                        defaultValue={""}
                                        name={"guardian_name"}
                                        className={`bg-gray-100 w-full rounded-md px-2 py-1 outline-0`}
                                    />
                                </div>

                                <div
                                    className={`flex w-full flex-col gap-1 min-w-[150px] flex-1`}
                                >
                                    <span>Guardian Relation</span>
                                    <input
                                        defaultValue={""}
                                        name={"guardian_relation"}
                                        className={`bg-gray-100 w-full rounded-md px-2 py-1 outline-0`}
                                    />
                                </div>
                            </div>

                            <div className={`flex w-full gap-2 justify-between flex-wrap`}>
                                <div
                                    className={`flex w-full flex-col gap-1 min-w-[150px] flex-1`}
                                >
                                    <span>UID</span>
                                    <input
                                        defaultValue={""}
                                        name={"uid"}
                                        className={`bg-gray-100 w-full rounded-md px-2 py-1 outline-0`}
                                    />
                                </div>

                                <div
                                    className={`flex w-full flex-col gap-1 min-w-[150px] flex-1`}
                                >
                                    <span>UID Type</span>
                                    <input
                                        defaultValue={""}
                                        name={"uid_type"}
                                        className={`bg-gray-100 w-full rounded-md px-2 py-1 outline-0`}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`flex justify-center`}>
                        {/* eslint-disable-next-line react/jsx-no-undef */}
                        <Button
                            type={"submit"}
                            variant={"solid"}
                            size={"sm"}
                            color={"primary"}
                        >
                            Submit
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default New_Employee_Page;
