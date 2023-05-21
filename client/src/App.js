import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./components/Layouts/Landing";
import Auth from "./views/Auth";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Landing />}></Route>
				<Route path="/login" element={<Auth authRoute="login" />}></Route>
				<Route path="/register" element={<Auth authRoute="register" />}></Route>
			</Routes>
		</Router>
	);
}

export default App;
