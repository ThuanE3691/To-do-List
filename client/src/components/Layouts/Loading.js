import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export const Loading = () => {
	return (
		<div className="loader">
			<FontAwesomeIcon
				icon={faSpinner}
				spin={true}
				size={"5x"}
				style={{ "--fa-animation-duration": "1s", color: "white" }}
			></FontAwesomeIcon>
			;
		</div>
	);
};

export default Loading;
