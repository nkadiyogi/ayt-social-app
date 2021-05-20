import { toast } from "react-toastify";
export const notify = (text, type) => {
	// console.log("notify ", text, type);
	switch (type.toLowerCase()) {
		case "success":
			toast.success(text);
			break;
		case "info":
			toast.info(text);
			break;
		case "warn":
			toast.warn(text);
			break;
		case "error":
			toast.error(text);
			break;
		default:
			toast(text);
	}
};
