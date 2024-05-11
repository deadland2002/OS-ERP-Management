import React, {PropsWithChildren} from 'react';
import {ToastContainer} from "react-toastify";
import {NextUIProvider} from "@nextui-org/react";

const Provider = ({ children }: PropsWithChildren) => {
  return <>
      <ToastContainer stacked />
      <NextUIProvider>
          {children}
      </NextUIProvider>
  </>;
};

export default Provider;
