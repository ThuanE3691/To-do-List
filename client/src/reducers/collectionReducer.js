import {
	COLLECTIONS_LOADED_SUCCESS,
	COLLECTIONS_ADD_SUCCESS,
	COLLECTION_VIEW_LOADED_SUCCESS,
	COLLECTION_VIEW_RESET,
	TASK_UPDATE_SUCCESS,
} from "../contexts/constans";

export const CollectionReducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case COLLECTIONS_LOADED_SUCCESS:
			return {
				...state,
				collections: payload,
				collectionsLoading: false,
			};
		case COLLECTIONS_ADD_SUCCESS:
			return {
				...state,
				collections: [...state.collections, payload],
			};
		case COLLECTION_VIEW_LOADED_SUCCESS:
			return {
				...state,
				collectionView: payload,
				collectionViewLoading: false,
			};
		case COLLECTION_VIEW_RESET:
			return {
				...state,
				collectionView: payload,
				collectionViewLoading: true,
			};
		case TASK_UPDATE_SUCCESS:
			const new_list = state.collectionView.list_tasks.map((task) => {
				return task._id !== payload._id ? task : payload;
			});
			return {
				...state,
				collectionView: {
					...state.collectionView,
					list_tasks: new_list,
				},
			};
		default:
			return state;
	}
};
