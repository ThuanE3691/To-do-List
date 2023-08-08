import {
	COLLECTIONS_LOADED_SUCCESS,
	COLLECTIONS_ADD_SUCCESS,
	COLLECTION_VIEW_LOADED_SUCCESS,
	COLLECTION_VIEW_RESET,
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
		default:
			return state;
	}
};
