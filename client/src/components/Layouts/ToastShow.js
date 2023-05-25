import "../../css/toast.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";

const ToastShow = ({ toast_class = "toast show", type, message }) => {
	const toast_icon_class = `toast-icon ${type}`;

	const {
		showToast: { show },
		setShowToast,
	} = useContext(AuthContext);

	const state = {
		success: `bx bxs-check-circle bx-sm ${toast_icon_class}`,
		warning: `bx bxs-error bx-sm ${toast_icon_class}`,
		info: `bx bxs-info-circle bx-sm ${toast_icon_class}`,
		error: `bx bxs-x-circle bx-sm ${toast_icon_class}`,
	};

	const [toastClass, setToastClass] = useState(toast_class);

	const auto_hide_toast = () => {
		setTimeout(() => {
			setToastClass("toast hide");
		}, 6000);
		setTimeout(() => {
			setShowToast((showToast) => {
				return { ...showToast, show: false };
			});
			setToastClass("toast show");
		}, 7000);
	};

	const onClose = async () => {
		setToastClass("toast hide");
		setTimeout(() => {
			if (toastClass === "toast hide" && show === true) {
				setShowToast((showToast) => {
					return { ...showToast, show: false };
				});
				setToastClass("toast show");
			}
		}, 1);
	};

	useEffect(() => {
		if (toastClass === "toast show") {
			setShowToast((showToast) => {
				return { ...showToast, show: true };
			});
		}
	}, [toast_class]);

	useEffect(() => {
		auto_hide_toast();
	}, []);

	return (
		<div className={toastClass}>
			<div class="column">
				<div className="toast-left">
					<i class={state[type]}></i>
					<p className="toast-message">{message}</p>
				</div>
				<FontAwesomeIcon
					icon={faXmark}
					className="toast-close"
					onClick={onClose}
				/>
			</div>
			<div className={`time-bar ${type}`}></div>
		</div>
	);
};

export default ToastShow;
