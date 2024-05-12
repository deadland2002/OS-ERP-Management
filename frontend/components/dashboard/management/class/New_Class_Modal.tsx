"use client";

import React, {useEffect, useRef} from "react";
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from "@nextui-org/modal";
import {Autocomplete, AutocompleteItem, Button} from "@nextui-org/react";
import {Input} from "@nextui-org/input";
import {
    API_UnAssigned_Coordinator_List,
    UnAssigned_Coordinator_List,
} from "../../../../helper/API/employee/get_unassigned_coordinator";
import {toast} from "react-toastify";
import {toastCompactTheme} from "../../../../Default/toast";
import {data} from "@formatjs/intl-localematcher/abstract/languageMatching";
import {API_Class_Add_New, API_Class_Add_New_Req} from "../../../../helper/API/class/add_new";

interface Props {
    closeModal: () => void;
}

const NewClassModal = (prop: Props) => {
    const [coordinatorList, setCoordinatorList] = React.useState<
        UnAssigned_Coordinator_List[]
    >([]);
    const formRef = useRef<HTMLFormElement>(null);
    const [selectedCoordinator,setSelectedCoordinator] = React.useState<string|null>(null);

    const getList = async () => {
        const promise = new Promise(async (resolve, reject) => {
            const response = await API_UnAssigned_Coordinator_List();
            if (response.error || response.message || !response.data)
                reject(response.message);

            if (response.data) setCoordinatorList(response.data);

            resolve(1);
        });

        await toast
            .promise(
                promise,
                {
                    pending: "Fetching coordinator list",
                    success: "Fetched coordinator list",
                },
                toastCompactTheme,
            )
            .catch((reason: string[]) => {
                for (const msg of reason) toast.warn(msg, toastCompactTheme);
            });
    };

    useEffect(() => {
        const time = setTimeout(getList, 500);
        return () => clearTimeout(time);
    }, []);

    const HandleSubmit = async () => {
        if (!formRef.current)
            return toast.warn("Form not selected", toastCompactTheme);

        const form = formRef.current as HTMLFormElement;
        const dataForm = new FormData(form);

        const obj: any = {
            class_name: dataForm.get("class_name"),
            coordinator: Number(selectedCoordinator),
            capacity: Number(dataForm.get("capacity")),
            fees_per_month: Number(dataForm.get("fees_per_month")),
            total_lectures: Number(dataForm.get("total_lectures")),
            start_date: dataForm.get("start_date"),
            end_date: dataForm.get("end_date"),
            total_months: Number(dataForm.get("total_months")),
        };

        if(obj.start_date)
            obj.start_date = (new Date(obj.start_date)).toISOString();

        if(obj.end_date)
            obj.end_date = (new Date(obj.end_date)).toISOString();

        const finalObj: any = {};

        for (let key of Object.keys(obj)) {
            if (obj[key as keyof API_Class_Add_New_Req]) {
                finalObj[key] = obj[key as keyof API_Class_Add_New_Req];
            }
        }

        console.log(obj);
        console.log(finalObj);

        const promise = new Promise(async (resolve, reject) => {
            const response = await API_Class_Add_New(finalObj);
            if (response.error || response.message) return reject(response.message);
            resolve(1);
        });

        await toast
            .promise(
                promise,
                {
                    pending: "Creating Class",
                    success: "Class Created",
                },
                toastCompactTheme,
            )
            .catch((reason: string[]) => {
                for (const msg of reason) toast.warn(msg, toastCompactTheme);
            });
    };

    return (
        <Modal
            isOpen={true}
            onOpenChange={prop.closeModal}
            isDismissable={false}
            isKeyboardDismissDisabled={true}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            Modal Title
                        </ModalHeader>
                        <ModalBody>
                            <form className={`flex flex-col gap-2`} ref={formRef}>
                                <Input
                                    type={"text"}
                                    label={"Name"}
                                    placeholder={"type here"}
                                    labelPlacement={"outside"}
                                    variant={"flat"}
                                    size={"sm"}
                                    name={"class_name"}
                                    isRequired
                                />
                                <Input
                                    type={"number"}
                                    label={"Capacity"}
                                    placeholder={"30"}
                                    labelPlacement={"outside"}
                                    variant={"flat"}
                                    size={"sm"}
                                    name={"capacity"}
                                    isRequired
                                />
                                <Input
                                    type={"number"}
                                    label={"Fees per month"}
                                    placeholder={"800"}
                                    labelPlacement={"outside"}
                                    variant={"flat"}
                                    size={"sm"}
                                    name={"fees_per_month"}
                                    isRequired
                                />
                                <Input
                                    type={"number"}
                                    label={"Total Lectures"}
                                    placeholder={"0"}
                                    labelPlacement={"outside"}
                                    variant={"flat"}
                                    size={"sm"}
                                    name={"total_lectures"}
                                />
                                <Input
                                    type={"date"}
                                    label={"Start Date"}
                                    placeholder={"0"}
                                    labelPlacement={"outside"}
                                    variant={"flat"}
                                    size={"sm"}
                                    name={"start_date"}
                                />
                                <Input
                                    type={"date"}
                                    label={"End Date"}
                                    placeholder={"0"}
                                    labelPlacement={"outside"}
                                    variant={"flat"}
                                    size={"sm"}
                                    name={"end_date"}
                                />
                                <Input
                                    type={"number"}
                                    label={"Total Months"}
                                    placeholder={"0"}
                                    labelPlacement={"outside"}
                                    variant={"flat"}
                                    size={"sm"}
                                    name={"total_months"}
                                />
                                <Autocomplete
                                    size={"sm"}
                                    name={"coordinator"}
                                    label={`Coordinator`}
                                    labelPlacement={"outside"}
                                    placeholder={`Select`}
                                    isLoading={coordinatorList.length === 0}
                                    onSelectionChange={(key)=>{setSelectedCoordinator(key as string)}}
                                >
                                    {coordinatorList.map((item) => (
                                        <AutocompleteItem key={item.employee_id}>
                                            {item.first_name + " " + item.last_name}
                                        </AutocompleteItem>
                                    ))}
                                </Autocomplete>
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                Close
                            </Button>
                            <Button color="primary" onPress={HandleSubmit}>
                                Action
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default NewClassModal;
