import toast from "react-hot-toast";

export const toastHandler = async ({ promise, loadingMessage = "", successMessage = "", errorMessage = "" }) => toast.promise(promise,
    {
        loading: loadingMessage,
        success: successMessage,
        error: errorMessage
    }
);