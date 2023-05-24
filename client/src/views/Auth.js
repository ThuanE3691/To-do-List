import "../css/auth.css";
import LoginForm from "../components/Auth/LoginForm";
import RegisterForm from "../components/Auth/RegisterForm";
import Loading from "../components/Layouts/Loading";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import ToastShow from "../components/Layouts/ToastShow";

const Auth = ({ authRoute }) => {
	const {
		authState: { authLoading, isAuthenticated },
		showToast: { show, type, message },
	} = useContext(AuthContext);

	let body;
	if (authLoading === true) {
		body = <Loading></Loading>;
	} else if (isAuthenticated === true)
		return <Navigate to="/dashboard"></Navigate>;
	else {
		body = (
			<>
				{show && <ToastShow type={type} message={message}></ToastShow>}
				{authRoute === "login" && <LoginForm />}
				{authRoute === "register" && <RegisterForm />}
			</>
		);
	}

	return (
		<div className="dark-theme">
			<div className="inner">
				{authRoute === "login" && <p className="title">Sign in.</p>}
				{authRoute === "register" && <p className="title">Create account</p>}
				{body}
			</div>
		</div>
	);
};

export default Auth;
