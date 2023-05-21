import "../css/auth.css";
import LoginForm from "../components/Auth/LoginForm";
import RegisterForm from "../components/Auth/RegisterForm";

const Auth = ({ authRoute }) => {
	let body = (
		<>
			{authRoute === "login" && <LoginForm />}
			{authRoute === "register" && <RegisterForm />}
		</>
	);
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
