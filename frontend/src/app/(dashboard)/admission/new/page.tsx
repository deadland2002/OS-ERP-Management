"use client";

import React from "react";
import ImageUpload from "../../../../../components/common/ImageUpload";
import FileUpload from "../../../../../components/common/FileUpload";
import {Button} from "@nextui-org/react";

const Page = () => {
  const [studentImage, setStudentImage] = React.useState<File | null>(null);
  const [classList,setClassList] = React.useState();

  const HandleChangeImage = (file: File) => {
    setStudentImage(file);
  };


  return (
    <div className={`flex w-full flex-col`}>
      <span className={`font-semibold`}>Add New Student</span>
      <div
        className={`border-gray-300 p-2 rounded-md w-full flex justify-center`}
      >
        <form className={`w-full text-sm flex max-w-[700px] gap-4 flex-col`}>

          <div className={`flex gap-4 w-full flex-col md:flex-row md:items-start items-center`}>
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
                <div className={`flex w-full flex-col max-w-[300px] gap-1 flex-1 min-w-[100px]`}>
                  <span>First Name</span>
                  <input
                    className={`bg-gray-100 w-full rounded-md px-2 py-1 outline-0`}
                  />
                </div>

                <div className={`flex w-full flex-col max-w-[300px] gap-1 flex-1 min-w-[100px]`}>
                  <span>Middle Name</span>
                  <input
                    className={`bg-gray-100 w-full rounded-md px-2 py-1 outline-0`}
                  />
                </div>

                <div className={`flex w-full flex-col max-w-[300px] gap-1 flex-1 min-w-[100px]`}>
                  <span>Last Name</span>
                  <input
                    className={`bg-gray-100 w-full rounded-md px-2 py-1 outline-0`}
                  />
                </div>
              </div>

              <div className={`flex flex-col w-full gap-2 justify-between flex-wrap`}>
                <div className={`flex w-full flex-col gap-1`}>
                  <span>Mobile No.</span>
                  <input
                    className={`bg-gray-100 w-full rounded-md px-2 py-1 outline-0`}
                  />
                </div>
                <div className={`flex w-full flex-col gap-1`}>
                  <span>Email</span>
                  <input
                    className={`bg-gray-100 w-full rounded-md px-2 py-1 outline-0`}
                  />
                </div>
              </div>

              <div className={`flex w-full gap-2 justify-between flex-wrap`}>
                <div className={`flex w-full flex-col gap-1 min-w-[150px] flex-1`}>
                  <span>Father Name</span>
                  <input
                    className={`bg-gray-100 w-full rounded-md px-2 py-1 outline-0`}
                  />
                </div>
                <div className={`flex w-full flex-col gap-1 min-w-[150px] flex-1`}>
                  <span>Mother Name</span>
                  <input
                    className={`bg-gray-100 w-full rounded-md px-2 py-1 outline-0`}
                  />
                </div>
              </div>

              <div className={`flex w-full gap-2 justify-between flex-wrap`}>
                <div className={`flex w-full flex-col gap-1 min-w-[150px] flex-1`}>
                  <span>Alternate No.</span>
                  <input
                    className={`bg-gray-100 w-full rounded-md px-2 py-1 outline-0`}
                  />
                </div>
                <div className={`flex w-full flex-col gap-1 min-w-[150px] flex-1`}>
                  <span>DOB</span>
                  <input
                    type={"date"}
                    className={`bg-gray-100 w-full rounded-md px-2 py-1 outline-0`}
                  />
                </div>
              </div>

              <div className={`flex w-full gap-2 justify-between flex-wrap`}>
                <div className={`flex w-full flex-col gap-1`}>
                  <span>Address</span>
                  <input
                    className={`bg-gray-100 w-full rounded-md px-2 py-1 outline-0`}
                  />
                </div>
              </div>

              <div className={`flex w-full gap-2 justify-between flex-wrap`}>
                <div className={`flex w-full flex-col gap-1 min-w-[150px] flex-1`}>
                  <span>City</span>
                  <input
                    className={`bg-gray-100 w-full rounded-md px-2 py-1 outline-0`}
                  />
                </div>

                <div className={`flex w-full flex-col gap-1 min-w-[150px] flex-1`}>
                  <span>State</span>
                  <input
                    className={`bg-gray-100 w-full rounded-md px-2 py-1 outline-0`}
                  />
                </div>
              </div>

              <div className={`flex w-full gap-2 justify-between flex-wrap`}>
                <div className={`flex w-full flex-col gap-1`}>
                  <span>Pincode</span>
                  <input
                    className={`bg-gray-100 w-full rounded-md px-2 py-1 outline-0`}
                  />
                </div>

                <div className={`flex w-full flex-col gap-1`}>
                  <span>Country</span>
                  <input
                    className={`bg-gray-100 w-full rounded-md px-2 py-1 outline-0`}
                  />
                </div>
              </div>

              <div className={`flex w-full gap-2 justify-between flex-wrap`}>
                <div className={`flex w-full flex-col gap-1 min-w-[150px] flex-1`}>
                  <span>UID</span>
                  <input
                      className={`bg-gray-100 w-full rounded-md px-2 py-1 outline-0`}
                  />
                </div>

                <div className={`flex w-full flex-col gap-1 min-w-[150px] flex-1`}>
                  <span>UID Type</span>
                  <input
                      className={`bg-gray-100 w-full rounded-md px-2 py-1 outline-0`}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={`flex justify-center`}>
            <Button variant={'solid'} size={'sm'} color={"primary"}>Submit</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
