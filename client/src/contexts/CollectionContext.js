import { createContext, useReducer } from "react";
import { API_URL } from "./constans";
import axios from "axios";
import { CollectionReducer } from "../reducers/collectionReducer";

export const CollectionContext = createContext();

const CollectionContextProvider = ({ children }) => {
	// State
	const [collectionState, dispatch] = useReducer(CollectionReducer, {
		collections: [],
		collectionsLoading: true,
	});

	const getCollections = async () => {
		try {
			const response = await axios.get(`${API_URL}/collections`);
			if (response.data.success) {
				dispatch({
					type: "COLLECTIONS_LOADED_SUCCESS",
					payload: response.data.collections,
				});
			}
		} catch (error) {
			return error.response.data
				? error.response.data
				: {
						success: false,
						message: "Server error",
				  };
		}
	};

	const collectionContextData = { collectionState, getCollections };

	return (
		<CollectionContext.Provider value={collectionContextData}>
			{children}
		</CollectionContext.Provider>
	);
};

export default CollectionContextProvider;
