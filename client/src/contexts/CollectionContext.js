import { createContext, useReducer, useState } from "react";
import {
	API_URL,
	COLLECTIONS_ADD_SUCCESS,
	COLLECTIONS_LOADED_SUCCESS,
	COLLECTION_VIEW_LOADED_SUCCESS,
	COLLECTION_VIEW_RESET,
	TASK_UPDATE_SUCCESS,
} from "./constans";
import axios from "axios";
import { CollectionReducer } from "../reducers/collectionReducer";

export const CollectionContext = createContext();

const CollectionContextProvider = ({ children }) => {
	// State
	const [collectionState, dispatch] = useReducer(CollectionReducer, {
		collections: [],
		collectionsLoading: true,
		collectionView: {},
		collectionViewLoading: true,
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

	const getOneCollection = async (id) => {
		try {
			const response = await axios.get(`${API_URL}/collections/${id}`);
			if (response.data.success) {
				dispatch({
					type: COLLECTION_VIEW_LOADED_SUCCESS,
					payload: response.data.collection,
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

	const resetCollectionView = () => {
		dispatch({
			type: COLLECTION_VIEW_RESET,
			payload: {},
		});
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

	const updateTask = async (task) => {
		const collection_id = collectionState.collectionView._id;
		const task_id = task._id;

		try {
			const response = await axios.put(
				`${API_URL}/collections/${collection_id}/tasks/${task_id}`,
				task
			);
			if (response.data.success) {
				dispatch({
					type: TASK_UPDATE_SUCCESS,
					payload: response.data.task,
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
		getOneCollection,
		resetCollectionView,
		updateTask,
	};

	return (
		<CollectionContext.Provider value={collectionContextData}>
			{children}
		</CollectionContext.Provider>
	);
};

export default CollectionContextProvider;
