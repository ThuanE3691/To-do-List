export const removeFromList = (tasks, task_target) => {
	let temp_list = [...tasks];
	return temp_list.filter((task) => task._id !== task_target._id);
};
