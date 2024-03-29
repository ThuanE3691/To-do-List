import {
	COLLECTION_LOADED_SUCCESS,
	TASKS_UNMOUNT,
	TASK_UPDATE_SUCCESS,
	TASK_ADDED_SUCCESS,
	REMOVE_ALL_TASK_SUCCESS,
	REMOVE_ONE_TASK_SUCCESS,
} from "../contexts/constants";

import { removeFromList } from "../utils/taskRemove";

function update_tasks(tasks, task_update) {
	const tasks_after_upgrade = tasks.map((task) => {
		return task._id !== task_update._id ? task : task_update;
	});

	return tasks_after_upgrade;
}

export const taskReducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case COLLECTION_LOADED_SUCCESS:
			return {
				...state,
				inCollection: payload,
				tasksLoading: false,
			};
		case TASKS_UNMOUNT:
			return {
				...state,
				inCollection: payload,
				tasksLoading: true,
			};
		case TASK_UPDATE_SUCCESS:
			const tasks_after_upgrade = update_tasks(
				state.inCollection.list_tasks,
				payload
			);
			return {
				...state,
				inCollection: {
					...state.inCollection,
					list_tasks: tasks_after_upgrade,
				},
			};
		case TASK_ADDED_SUCCESS:
			return {
				...state,
				inCollection: {
					...state.inCollection,
					list_tasks: [...state.inCollection.list_tasks, payload],
				},
			};
		case REMOVE_ALL_TASK_SUCCESS:
			return {
				...state,
				inCollection: {
					...state.inCollection,
					list_tasks: [],
				},
			};
		case REMOVE_ONE_TASK_SUCCESS:
			const new_list = removeFromList(state.inCollection.list_tasks, payload);
			return {
				...state,
				inCollection: {
					...state.inCollection,
					list_tasks: new_list,
				},
			};
		default:
			return state;
	}
};
