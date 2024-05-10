"use client";

import React, {FormEvent, useEffect} from "react";
import ImageUpload from "../../../../../components/common/ImageUpload";
import {Autocomplete, AutocompleteItem, Button, Select, SelectItem} from "@nextui-org/react";
import {API_Class_Get_List, Class_Get_List_Type} from "../../../../../helper/API/class/get_class_list";
import {API_Auth_Profile} from "../../../../../helper/API/auth/profile";
import {toast} from "react-toastify";
import promise = toast.promise;
import {toastCompactTheme} from "../../../../../Default/toast";

const Page = () => {
  const [studentImage, setStudentImage] = React.useState<File | null>(null);
  const [classList, setClassList] = React.useState<Class_Get_List_Type[] | null>(null);

  const HandleChangeImage = (file: File) => {
    setStudentImage(file);
  };

  useEffect(() => {
    const getList = async () =>{
      const promise = new Promise(async (resolve,reject)=>{
        const response = await API_Class_Get_List();
        if(response.error || !response.data)
          reject(response.error);
        else{
          console.log(response.data)
          setClassList(response.data)
          resolve(1);
        }
      })

      toast.promise(promise,{
        pending:"Fetching class list",
        success:"Class list fetched"
      },toastCompactTheme).catch((reason:string[]) => {
        for(let msg of reason)
          toast.error(msg,toastCompactTheme);
      })
    }

    const id = setTimeout(getList,500);
    return ()=>{
      clearTimeout(id);
    }
  }, []);


  const HandleSubmit = (e:FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
    const data = new FormData(e.target as HTMLFormElement)
    const list = data.entries()
    for (let li of list)
      console.log(li)
  }

  return (
    <div className={`flex w-full flex-col`}>
      <span className={`font-semibold`}>Add New Student</span>
      <div
        className={`border-gray-300 p-2 rounded-md w-full flex justify-center`}
      >
        <form className={`w-full text-sm flex max-w-[700px] gap-4 flex-col`} onSubmit={HandleSubmit}>

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
                      name={"first_name"}
                      className={`bg-gray-100 w-full rounded-md px-2 py-1 outline-0`}
                  />
                </div>

                <div className={`flex w-full flex-col max-w-[300px] gap-1 flex-1 min-w-[100px]`}>
                  <span>Middle Name</span>
                  <input
                      name={"middle_name"}
                      className={`bg-gray-100 w-full rounded-md px-2 py-1 outline-0`}
                  />
                </div>

                <div className={`flex w-full flex-col max-w-[300px] gap-1 flex-1 min-w-[100px]`}>
                  <span>Last Name</span>
                  <input
                      name={"last_name"}
                      className={`bg-gray-100 w-full rounded-md px-2 py-1 outline-0`}
                  />
                </div>
              </div>

              <div className={`flex flex-col w-full gap-2 justify-between flex-wrap`}>
                <div className={`flex w-full flex-col gap-1`}>
                  <span>Mobile No.</span>
                  <input
                      name={"mobile_no"}
                      className={`bg-gray-100 w-full rounded-md px-2 py-1 outline-0`}
                  />
                </div>
                <div className={`flex w-full flex-col gap-1`}>
                  <span>Email</span>
                  <input
                      name={"email"}
                      className={`bg-gray-100 w-full rounded-md px-2 py-1 outline-0`}
                  />
                </div>
              </div>

              <div className={`flex w-full gap-2 justify-between flex-wrap`}>
                <div className={`flex w-full flex-col gap-1 min-w-[150px] flex-1`}>
                  <span>Father Name</span>
                  <input
                      name={"father_name"}
                      className={`bg-gray-100 w-full rounded-md px-2 py-1 outline-0`}
                  />
                </div>
                <div className={`flex w-full flex-col gap-1 min-w-[150px] flex-1`}>
                  <span>Mother Name</span>
                  <input
                      name={"mother_name"}
                      className={`bg-gray-100 w-full rounded-md px-2 py-1 outline-0`}
                  />
                </div>
              </div>

              <div className={`flex w-full gap-2 justify-between flex-wrap`}>
                <div className={`flex w-full flex-col gap-1 min-w-[150px] flex-1`}>
                  <span>Alternate No.</span>
                  <input
                      name={"alternate_no"}
                      className={`bg-gray-100 w-full rounded-md px-2 py-1 outline-0`}
                  />
                </div>
                <div className={`flex w-full flex-col gap-1 min-w-[150px] flex-1`}>
                  <span>DOB</span>
                  <input
                      type={"date"}
                      name={"date_of_birth"}
                      className={`bg-gray-100 w-full rounded-md px-2 py-1 outline-0`}
                  />
                </div>
              </div>

              <div className={`flex w-full gap-2 justify-between flex-wrap`}>
                <div className={`flex w-full flex-col gap-1`}>
                  <span>Address</span>
                  <input
                      name={"address"}
                      className={`bg-gray-100 w-full rounded-md px-2 py-1 outline-0`}
                  />
                </div>
              </div>

              <div className={`flex w-full gap-2 justify-between flex-wrap`}>
                <div className={`flex w-full flex-col gap-1 min-w-[150px] flex-1`}>
                  <span>City</span>
                  <input
                      name={"city"}
                      className={`bg-gray-100 w-full rounded-md px-2 py-1 outline-0`}
                  />
                </div>

                <div className={`flex w-full flex-col gap-1 min-w-[150px] flex-1`}>
                  <span>State</span>
                  <input
                      name={"state"}
                      className={`bg-gray-100 w-full rounded-md px-2 py-1 outline-0`}
                  />
                </div>
              </div>

              <div className={`flex w-full gap-2 justify-between flex-wrap`}>
                <div className={`flex w-full flex-col gap-1 min-w-[150px] flex-1`}>
                  <span>Pincode</span>
                  <input
                      name={"pincode"}
                      className={`bg-gray-100 w-full rounded-md px-2 py-1 outline-0`}
                  />
                </div>

                <div className={`flex w-full flex-col gap-1 min-w-[150px] flex-1`}>
                  <span>Country code</span>
                  <input
                      name={"country_code"}
                      className={`bg-gray-100 w-full rounded-md px-2 py-1 outline-0`}
                  />
                </div>
              </div>

              <div className={`flex w-full gap-2 justify-between flex-wrap`}>
                <div className={`flex w-full flex-col gap-1 min-w-[150px] flex-1`}>
                  <span>Guardian Name</span>
                  <input
                      name={"guardian_name"}
                      className={`bg-gray-100 w-full rounded-md px-2 py-1 outline-0`}
                  />
                </div>

                <div className={`flex w-full flex-col gap-1 min-w-[150px] flex-1`}>
                  <span>Guardian Relation</span>
                  <input
                      name={"guardian_relation"}
                      className={`bg-gray-100 w-full rounded-md px-2 py-1 outline-0`}
                  />
                </div>
              </div>

              <div className={`flex w-full gap-2 justify-between flex-wrap`}>
                <div className={`flex w-full flex-col gap-1 min-w-[150px] flex-1`}>
                  <span>UID</span>
                  <input
                      name={"uid"}
                      className={`bg-gray-100 w-full rounded-md px-2 py-1 outline-0`}
                  />
                </div>

                <div className={`flex w-full flex-col gap-1 min-w-[150px] flex-1`}>
                  <span>UID Type</span>
                  <input
                      name={"uid_type"}
                      className={`bg-gray-100 w-full rounded-md px-2 py-1 outline-0`}
                  />
                </div>
              </div>

              <div className={`flex w-full gap-2 justify-between flex-wrap`}>
                <Autocomplete
                    allowsCustomValue
                    label="Class"
                    placeholder="Select an class"
                    labelPlacement={"outside"}
                    size={'sm'}
                    variant="flat"
                    defaultItems={classList || []}
                    isLoading={classList ? classList.length === 0 : true}
                    isDisabled={classList ? classList.length === 0 : true}
                    fullWidth
                    name="class_id"
                >
                  {(item) => <AutocompleteItem key={item.class_id} value={item.class_id}>{item.class_name}</AutocompleteItem>}
                </Autocomplete>
              </div>

            </div>
          </div>
          <div className={`flex justify-center`}>
            <Button type={'submit'} variant={'solid'} size={'sm'} color={"primary"}>Submit</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
