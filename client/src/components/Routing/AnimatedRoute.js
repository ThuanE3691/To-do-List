import { Route, Routes, useLocation } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../../views/Dashboard";
import Collection from "../../views/Collection";
import TasksPage from "../../views/TasksPage";
import Landing from "../Layouts/Landing";
import Auth from "../../views/Auth";
import { AnimatePresence } from "framer-motion";
import "../../App.css";

function AnimatedRoute() {
	const location = useLocation();
	return (
		<AnimatePresence mode="wait">
			<Routes location={location} key={location.pathname}>
				<Route path="/" element={<Landing />}></Route>
				<Route path="/login" element={<Auth authRoute="login" />}></Route>
				<Route path="/register" element={<Auth authRoute="register" />}></Route>
				<Route
					path="/dashboard"
					element={<ProtectedRoute component={Dashboard} />}
				></Route>
				<Route
					path="/collections"
					element={<ProtectedRoute component={Collection} />}
				></Route>
				<Route
					path="/collections/tasks"
					element={<ProtectedRoute component={TasksPage} />}
				></Route>
			</Routes>
		</AnimatePresence>
	);
}

export default AnimatedRoute;
