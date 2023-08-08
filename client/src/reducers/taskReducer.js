import {
	TASKS_LOADED_SUCCESS,
	TASK_UPDATE_SUCCESS,
} from "../contexts/constans";

export const taskReducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case TASKS_LOADED_SUCCESS:
			return {
				...state,
				tasks: payload.tasks,
				collectionName: payload.collectionName,
				tasksLoading: false,
			};
		default:
			return state;
	}
};
