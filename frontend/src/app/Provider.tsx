import React, {PropsWithChildren} from 'react';
import {ToastContainer} from "react-toastify";

const Provider = ({ children }: PropsWithChildren) => {
  return <>
      {children}
      <ToastContainer />
  </>;
};

export default Provider;
