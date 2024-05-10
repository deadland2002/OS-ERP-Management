import {Bounce, ToastOptions} from "react-toastify";

const toastDefaultTheme :ToastOptions = {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "light",
    transition: Bounce,
    style:{
        minHeight:0
    },
    bodyStyle:{
        margin: 2,
        padding: 2,
    }
}




const toastFastTheme :ToastOptions = {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "light",
    transition: Bounce,
}



const toastCompactTheme :ToastOptions = {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
    style:{
        minHeight:0
    },
    bodyStyle:{
        margin: 2,
        padding: 2,
    }
}

export { toastDefaultTheme , toastFastTheme , toastCompactTheme }
