import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";

const LoginForm = () => {
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
					></Form.Control>
				</Row>
			</Form.Group>
			<Button className="form-button">Sign in</Button>
			<Form.Group className="form-account">
				<Form.Text>Don't have an account?</Form.Text>
				<Link to="/register"> Create Account</Link>
			</Form.Group>
		</Form>
	);
};

export default LoginForm;
