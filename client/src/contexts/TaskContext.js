import { createContext, useReducer, useState } from "react";
import {
	API_URL,
	TASK_UPDATE_SUCCESS,
	COLLECTION_LOADED_SUCCESS,
	TASKS_UNMOUNT,
	TASK_ADDED_SUCCESS,
} from "./constans";
import axios from "axios";
import { taskReducer } from "../reducers/taskReducer";

export const TaskContext = createContext();

function tasks_claffication(tasks) {
	const tasksNotFinish = tasks
		.filter((item) => item.check === false)
		.sort((a, b) => new Date(a.create_at) - new Date(b.create_at));

	const tasksFinish = tasks
		.filter((item) => item.check === true)
		.sort((a, b) => new Date(a.finish_at) - new Date(b.finish_at));

	return {
		tasksNotFinish,
		tasksFinish,
	};
}

const TaskContextProvider = ({ children }) => {
	// State
	const [taskState, dispatch] = useReducer(taskReducer, {
		inCollection: {},
		tasksLoading: true,
	});

	const [finishTasks, SetFinishTasks] = useState([]);
	const [notFinishTasks, SetNotFinishTasks] = useState([]);

	const [showAddTask, SetShowAddTask] = useState(false);

	const getTaskFromCollection = async (collection_id) => {
		try {
			const response = await axios.get(
				`${API_URL}/collections/${collection_id}`
			);
			if (response.data.success) {
				dispatch({
					type: COLLECTION_LOADED_SUCCESS,
					payload: response.data.collection,
				});

				const { tasksNotFinish, tasksFinish } = tasks_claffication(
					response.data.collection.list_tasks
				);

				SetFinishTasks(tasksFinish);
				SetNotFinishTasks(tasksNotFinish);
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

	const addNewTask = async (new_task, collection_id) => {
		try {
			const response = await axios.post(
				`${API_URL}/collections/${collection_id}/tasks`,
				new_task
			);

			if (response.data.success) {
				dispatch({
					type: TASK_ADDED_SUCCESS,
					payload: response.data.task,
				});

				SetNotFinishTasks([...notFinishTasks, response.data.task]);
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

	const unMountTasks = () => {
		dispatch({
			type: TASKS_UNMOUNT,
			payload: {},
		});

		SetFinishTasks([]);
		SetNotFinishTasks([]);
	};

	const updateTask = async (task, index) => {
		const collection_id = taskState.inCollection._id;
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

				// Case update from not finish task to finish

				let new_not_finish_tasks;
				let new_finish_tasks;
				if (task.check === true) {
					new_not_finish_tasks = [...notFinishTasks];
					new_not_finish_tasks.splice(index, 1);
					new_finish_tasks = [...finishTasks, task];
				} else {
					new_finish_tasks = [...finishTasks];
					new_finish_tasks.splice(index, 1);
					new_not_finish_tasks = [...notFinishTasks, task];
				}

				SetNotFinishTasks(new_not_finish_tasks);
				SetFinishTasks(new_finish_tasks);
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

	const taskContextData = {
		taskState,
		finishTasks,
		notFinishTasks,
		getTaskFromCollection,
		updateTask,
		unMountTasks,
		showAddTask,
		SetShowAddTask,
		addNewTask,
	};

	return (
		<TaskContext.Provider value={taskContextData}>
			{children}
		</TaskContext.Provider>
	);
};

export default TaskContextProvider;
