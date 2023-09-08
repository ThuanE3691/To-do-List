import { createContext, useReducer, useEffect, useState } from "react";
import { authReducer } from "../reducers/authReducer";
import { API_URL, LOCAL_STORAGE_TOKEN_NAME } from "./constants";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
	const [authState, dispatch] = useReducer(authReducer, {
		authLoading: true,
		isAuthenticated: false,
		user: null,
	});

	const [showToast, setShowToast] = useState({
		show: false,
		type: "",
		message: "",
	});

	const loadUser = async () => {
		if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
			setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
		}

		try {
			const response = await axios.get(`${API_URL}/auth`);
			if (response.data.success) {
				dispatch({
					type: "SET_AUTH",
					payload: {
						isAuthenticated: true,
						user: response.data.user,
					},
				});
			}
		} catch (error) {
			localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
			setAuthToken(null);
			dispatch({
				type: "SET_AUTH",
				payload: {
					isAuthenticated: false,
					user: null,
				},
			});
		}
	};

	useEffect(() => {
		loadUser();
	}, []);

	// Login
	const loginUser = async (userForm) => {
		try {
			const response = await axios.post(`${API_URL}/auth/login`, userForm);
			if (response.data.success) {
				localStorage.setItem(
					LOCAL_STORAGE_TOKEN_NAME,
					response.data.accessToken
				);
			}

			await loadUser();

			return response.data;
		} catch (error) {
			if (error.response.data) return error.response.data;
			else return { success: false, message: error.message };
		}
	};

	// register
	const registerUser = async (registerForm) => {
		try {
			const response = await axios.post(
				`${API_URL}/auth/register`,
				registerForm
			);
			if (response.data.success) {
				dispatch({
					type: "SET_AUTH",
					payload: { isAuthenticated: false },
				});
			}

			return response.data;
		} catch (error) {
			if (error.response.data) return error.response.data;
			else return { success: false, message: error.message };
		}
	};

	const AuthContextData = {
		loginUser,
		registerUser,
		showToast,
		setShowToast,
		authState,
	};

	return (
		<AuthContext.Provider value={AuthContextData}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContextProvider;
