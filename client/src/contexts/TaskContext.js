import { createContext, useContext, useReducer, useState } from "react";
import { API_URL, TASKS_LOADED_SUCCESS, TASK_UPDATE_SUCCESS } from "./constans";
import axios from "axios";
import { CollectionReducer } from "../reducers/collectionReducer";
import { CollectionContext } from "./CollectionContext";
import { taskReducer } from "../reducers/taskReducer";

export const TaskContext = createContext();

const TaskContextProvider = ({ children }) => {
	const {
		collectionState: { collectionView, collectionViewLoading },
		getOneCollection,
	} = useContext(CollectionContext);

	// State
	const [taskState, dispatch] = useReducer(taskReducer, {
		uncomplete_tasks: [],
		complete_tasks: [],
	});

	const getTasks = async (collection_id) => {
		await getOneCollection(collection_id);
		if (!collectionViewLoading) {
			dispatch({
				type: TASKS_LOADED_SUCCESS,
				payload: {
					tasks: collectionView.list_tasks,
					collectionName: collectionView.name,
				},
			});
		}
	};

	const updateTask = async (collection_id, task_id, updated_task) => {
		try {
			const response = await axios.put(
				`${API_URL}/collections/${collection_id}/tasks/${task_id}`,
				updated_task
			);
			if (response.data.success) {
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

	const taskContextData = { taskState, getTasks, updateTask };

	return (
		<TaskContext.Provider value={taskContextData}>
			{children}
		</TaskContext.Provider>
	);
};

export default TaskContextProvider;
