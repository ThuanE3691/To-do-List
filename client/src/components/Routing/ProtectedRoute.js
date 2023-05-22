import { AuthContext } from "../../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import Loading from "../Layouts/Loading";

const ProtectedRoute = ({ component: Component, ...rest }) => {
	const {
		authState: { authLoading, isAuthenticated },
	} = useContext(AuthContext);

	if (authLoading === true) {
		return <Loading></Loading>;
	}

	return isAuthenticated ? (
		<>
			<Component></Component>
		</>
	) : (
		<Navigate to="/login"></Navigate>
	);
};

export default ProtectedRoute;
