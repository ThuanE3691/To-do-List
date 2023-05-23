import "../../css/toast.css";
import successIcon from "../../assets/success.svg";

const ToastShow = () => {
	return (
		<div className="toast">
			<i src={successIcon} alt="success" width="24" height="24"></i>
			<p>Message</p>
		</div>
	);
};

export default ToastShow;
