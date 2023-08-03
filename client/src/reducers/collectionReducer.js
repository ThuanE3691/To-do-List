export const CollectionReducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case "COLLECTIONS_LOADED_SUCCESS":
			return {
				...state,
				collections: payload,
				collectionsLoading: false,
			};
		default:
			return state;
	}
};
