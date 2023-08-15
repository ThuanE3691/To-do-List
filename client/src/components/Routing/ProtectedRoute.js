import { AuthContext } from "../../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import Loading from "../Layouts/Loading";
import Navbar from "../Layouts/Navbar";

const ProtectedRoute = ({ component: Component, ...rest }) => {
	const {
		authState: { authLoading, isAuthenticated },
	} = useContext(AuthContext);

	if (authLoading === true) {
		return <Loading></Loading>;
	}

	return isAuthenticated ? (
		<>
			<Navbar></Navbar>
			<div className="page">
				<Component></Component>
			</div>
		</>
	) : (
		<Navigate to="/login"></Navigate>
	);
};

export default ProtectedRoute;
