import { createContext, useReducer, useState } from "react";
import {
	API_URL,
	COLLECTIONS_ADD_SUCCESS,
	COLLECTIONS_LOADED_SUCCESS,
} from "./constants";
import axios from "axios";
import { CollectionReducer } from "../reducers/collectionReducer";

export const CollectionContext = createContext();

const CollectionContextProvider = ({ children }) => {
	// State
	const [collectionState, dispatch] = useReducer(CollectionReducer, {
		collections: [],
		collectionsLoading: true,
	});

	const [isOpenCreateCollection, SetIsOpenCreateCollection] = useState(false);

	const [newCollection, SetNewCollection] = useState({
		name: "",
		image: null,
		color: "#000000",
	});

	const [isCompleteForm, SetIsCompleteForm] = useState({
		name: false,
		icon: false,
	});

	const getCollections = async () => {
		try {
			const response = await axios.get(`${API_URL}/collections`);
			if (response.data.success) {
				dispatch({
					type: COLLECTIONS_LOADED_SUCCESS,
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

	const addCollection = async (newCollection) => {
		try {
			const response = await axios.post(
				`${API_URL}/collections`,
				newCollection
			);
			if (response.data.success) {
				dispatch({
					type: COLLECTIONS_ADD_SUCCESS,
					payload: response.data.new_collection,
				});
				return response.data;
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

	const resetCreateCollection = () => {
		SetNewCollection({
			...newCollection,
			name: "",
			image: null,
			color: "#000000",
		});
		SetIsCompleteForm({
			...isCompleteForm,
			name: false,
			icon: false,
		});
	};

	const collectionContextData = {
		collectionState,
		getCollections,
		isOpenCreateCollection,
		SetIsOpenCreateCollection,
		newCollection,
		SetNewCollection,
		isCompleteForm,
		SetIsCompleteForm,
		resetCreateCollection,
		addCollection,
	};

	return (
		<CollectionContext.Provider value={collectionContextData}>
			{children}
		</CollectionContext.Provider>
	);
};

export default CollectionContextProvider;
