import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import AuthContextProvider from "./contexts/AuthContext";
import CollectionContextProvider from "./contexts/CollectionContext";
import TaskContextProvider from "./contexts/TaskContext";
import AnimatedRoute from "./components/Routing/AnimatedRoute";

function App() {
	return (
		<AuthContextProvider>
			<CollectionContextProvider>
				<TaskContextProvider>
					<Router>
						<AnimatedRoute></AnimatedRoute>
					</Router>
				</TaskContextProvider>
			</CollectionContextProvider>
		</AuthContextProvider>
	);
}

export default App;
