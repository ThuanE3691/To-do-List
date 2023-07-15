import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./components/Layouts/Landing";
import Auth from "./views/Auth";
import AuthContextProvider from "./contexts/AuthContext";
import ProtectedRoute from "./components/Routing/ProtectedRoute";
import Dashboard from "./views/Dashboard";
import Collection from "./views/Collection";

function App() {
	return (
		<AuthContextProvider>
			<Router>
				<Routes>
					<Route path="/" element={<Landing />}></Route>
					<Route path="/login" element={<Auth authRoute="login" />}></Route>
					<Route
						path="/register"
						element={<Auth authRoute="register" />}
					></Route>
					<Route
						path="/dashboard"
						element={<ProtectedRoute component={Dashboard} />}
					></Route>
					<Route
						path="/collections"
						element={<ProtectedRoute component={Collection} />}
					></Route>
				</Routes>
			</Router>
		</AuthContextProvider>
	);
}

export default App;
