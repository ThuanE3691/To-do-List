import {
	COLLECTIONS_LOADED_SUCCESS,
	COLLECTIONS_ADD_SUCCESS,
} from "../contexts/constants";

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
		default:
			return state;
	}
};
