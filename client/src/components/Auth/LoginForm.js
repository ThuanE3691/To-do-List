import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

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

	return (
		<Form>
			<Form.Group className="mt-8">
				<Row className="form-row">
					<FontAwesomeIcon
						icon={faUser}
						style={{ color: "#dbdfe6", height: "16px" }}
						className="form-icon"
					/>
					<Form.Control
						type="text"
						placeholder="Username"
						name="username"
						className="form-input"
						value={username}
						onChange={onChangeInput}
					></Form.Control>
				</Row>
				<Row className="form-row">
					<FontAwesomeIcon
						icon={faLock}
						style={{ color: "#dbdfe6", height: "16px" }}
						className="form-icon"
					/>
					<Form.Control
						type="text"
						placeholder="Password"
						name="password"
						className="form-input"
						value={password}
						onChange={onChangeInput}
					></Form.Control>
				</Row>
			</Form.Group>
			<Button className="form-button" onClick={login}>
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
