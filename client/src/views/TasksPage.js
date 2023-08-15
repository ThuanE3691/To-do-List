import "../css/collection.css";
import { useContext, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { COLLECTION_VIEW } from "../contexts/constans";
import "../css/tasksPage.css";
import back from "../assets/back.png";
import add from "../assets/add.png";
import { useNavigate } from "react-router-dom";
import Task from "../components/Collections/Task";
import { TaskContext } from "../contexts/TaskContext";

const DisplayTask = ({ finishTasks, notFinishTasks, updateTask }) => {
	const handleToggleCheck = async (task, taskIndex) => {
		const new_task = { ...task, check: !task.check };
		await updateTask(new_task, taskIndex);
	};

	const renderTask = (task, index) => {
		return (
			<motion.div
				initial={{ y: -20, scale: 0.8, opacity: 0 }}
				animate={{ y: 0, scale: 1, opacity: 1 }}
				exit={{ scale: 0.8, opacity: 0 }}
				onClick={() => handleToggleCheck(task, index)}
				transition={{ duration: 0.3 }}
				layout
				key={task._id}
			>
				<Task name={task.name} check={task.check}></Task>
			</motion.div>
		);
	};

	return (
		<div>
			<div className="uncomplete-task" key="uncomplete">
				<p>Tasks - {notFinishTasks.length}</p>
				<AnimatePresence mode="popLayout">
					{notFinishTasks.map(renderTask)}
				</AnimatePresence>
			</div>
			<div className="complete-task" key="complete">
				<p>Completed - {finishTasks.length}</p>
				<AnimatePresence mode="popLayout">
					{finishTasks.map(renderTask)}
				</AnimatePresence>
			</div>
		</div>
	);
};

const TasksContainer = ({
	inCollection,
	notFinishTasks,
	finishTasks,
	onClickBackToCollection,
	updateTask,
}) => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			key="task-display"
		>
			<div className="task-header">
				<motion.div
					className="task-back"
					whileHover={{ opacity: 0.6 }}
					transition={{ duration: 0.2 }}
					onClick={onClickBackToCollection}
				>
					<img src={back} alt="" />
				</motion.div>

				<div className="task-title">{inCollection.name}</div>
			</div>
			<motion.div
				className="add-task-area"
				whileHover={{ opacity: 0.6 }}
				transition={{ duration: 0.2 }}
			>
				<div className="add-task-icon">
					<img src={add} alt="" />
				</div>
				<p>Add a task</p>
			</motion.div>
			<div className="task-display-area">
				<DisplayTask
					updateTask={updateTask}
					finishTasks={finishTasks}
					notFinishTasks={notFinishTasks}
				></DisplayTask>
			</div>
		</motion.div>
	);
};

const TasksPage = () => {
	const {
		taskState: { inCollection, tasksLoading },
		finishTasks,
		notFinishTasks,
		getTaskFromCollection,
		unMountTasks,
		updateTask,
	} = useContext(TaskContext);

	const navigate = useNavigate();

	const onClickBackToCollection = () => {
		navigate("/collections");
		unMountTasks();
	};

	useEffect(() => {
		const collection_id = localStorage.getItem(COLLECTION_VIEW);
		getTaskFromCollection(collection_id);
	}, []);

	return (
		<motion.div
			key="task-page"
			className="pg-task-container"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{
				type: "tween",
				duration: 0.5,
			}}
		>
			<AnimatePresence>
				{!tasksLoading && (
					<TasksContainer
						inCollection={inCollection}
						notFinishTasks={notFinishTasks}
						finishTasks={finishTasks}
						onClickBackToCollection={onClickBackToCollection}
						updateTask={updateTask}
					></TasksContainer>
				)}
			</AnimatePresence>
		</motion.div>
	);
};

export default TasksPage;
