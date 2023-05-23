import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import InputField from "../Layouts/InputField";

const LoginForm = () => {
	const { loginUser } = useContext(AuthContext);

	const [loginForm, setLoginForm] = useState({
		username: "",
		password: "",
	});

	const { username, password } = loginForm;

	const navigate = useNavigate();

	const onChangeInput = (event) => {
		setLoginForm({ ...loginForm, [event.target.name]: event.target.value });
	};

	const login = async (event) => {
		event.preventDefault();
		try {
			const loginData = await loginUser(loginForm);
			if (!loginData.success) {
				console.log(loginData.message);
			} else {
				console.log(loginData);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const button_state = username && password ? "active" : "not-active";

	return (
		<Form>
			<Form.Group className="mt-8">
				<InputField
					icon={faUser}
					iconStyle={{ color: "#dbdfe6", height: "16px" }}
					type={"text"}
					value={username}
					name="username"
					onChange={onChangeInput}
					placeholder={"Username"}
				></InputField>
				<InputField
					icon={faLock}
					iconStyle={{ color: "#dbdfe6", height: "16px" }}
					type={"password"}
					value={password}
					onChange={(e) => onChangeInput(e)}
					placeholder={"Password"}
					name="password"
				></InputField>
			</Form.Group>
			<Button className={`form-button ${button_state}`} onClick={login}>
				Sign in
			</Button>
			<Form.Group className="form-account">
				<Form.Text>Don't have an account?</Form.Text>
				<Link to="/register"> Create Account</Link>
			</Form.Group>
		</Form>
	);
};

export default LoginForm;
