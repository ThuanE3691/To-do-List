import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";

const RegisterForm = () => {
	return (
		<Form>
			<Form.Group className="mt-8">
				<Row>
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
				<Row className="form-row">
					<Form.Control
						type="text"
						placeholder="Confirm password"
						name="confirm_password"
						className="form-input"
					></Form.Control>
				</Row>
			</Form.Group>
			<Button className="form-button">Create Account</Button>
			<Form.Group className="form-account">
				<Form.Text>Already have an account?</Form.Text>
				<Link to="/login"> Sign in</Link>
			</Form.Group>
		</Form>
	);
};

export default RegisterForm;
