import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext, useState } from "react";
import InputField from "../Layouts/InputField";

const RegisterForm = () => {
	const { registerUser, setShowToast } = useContext(AuthContext);

	const [registerForm, setRegisterForm] = useState({
		username: "",
		password: "",
		confirmPassword: "",
	});

	const navigate = useNavigate();

	const { username, password, confirmPassword } = registerForm;

	const onChangeInputField = (events) => {
		setRegisterForm({
			...registerForm,
			[events.target.name]: events.target.value,
		});
	};

	const register = async () => {
		// Check password and confirm password has same value
		if (password !== confirmPassword) {
			setShowToast({
				show: true,
				type: "warning",
				message: "Password and confirm password do not match",
			});
		} else {
			const register_data = await registerUser(registerForm);
			if (register_data.success) {
				setShowToast({
					show: true,
					type: "success",
					message: register_data.message,
				});
				navigate("/login");
			} else {
				setShowToast({
					show: true,
					type: "warning",
					message: register_data.message,
				});
			}
		}
	};

	const button_state =
		username && password && confirmPassword ? "active" : "not-active";

	return (
		<Form>
			<Form.Group className="mt-8">
				<InputField
					type="text"
					placeholder="Username"
					name="username"
					className="form-input"
					icon={faUser}
					iconStyle={{ color: "#dbdfe6", height: "16px" }}
					value={username}
					onChange={onChangeInputField}
				></InputField>
				<InputField
					type="password"
					placeholder="Password"
					name="password"
					className="form-input"
					icon={faLock}
					iconStyle={{ color: "#dbdfe6", height: "16px" }}
					value={password}
					onChange={onChangeInputField}
				></InputField>
				<InputField
					type="password"
					placeholder="Confirm Password"
					name="confirmPassword"
					className="form-input"
					value={confirmPassword}
					onChange={onChangeInputField}
				></InputField>
			</Form.Group>
			<Button className={`form-button ${button_state}`} onClick={register}>
				Create Account
			</Button>
			<Form.Group className="form-account">
				<Form.Text>Already have an account?</Form.Text>
				<Link to="/login"> Sign in</Link>
			</Form.Group>
		</Form>
	);
};

export default RegisterForm;
