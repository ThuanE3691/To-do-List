import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

const InputField = ({
	icon,
	iconStyle,
	name,
	type,
	placeholder,
	value,
	onChange,
}) => {
	return (
		<Row className="form-row">
			<FontAwesomeIcon icon={icon} style={iconStyle} className="form-icon" />
			<Form.Control
				type={type}
				placeholder={placeholder}
				name={name}
				className="form-input"
				value={value}
				onChange={onChange}
				autoComplete="off"
			></Form.Control>
			<label className="form-input-label active">{placeholder}</label>
		</Row>
	);
};

export default InputField;
