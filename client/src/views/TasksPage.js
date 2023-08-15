import "../css/collection.css";
import { CollectionContext } from "../contexts/CollectionContext";
import { useContext, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { COLLECTION_VIEW } from "../contexts/constans";
import "../css/tasksPage.css";
import back from "../assets/back.png";
import add from "../assets/add.png";
import { useNavigate } from "react-router-dom";
import Task from "../components/Collections/Task";
import { TaskContext } from "../contexts/TaskContext";
import { v4 as uuidv4 } from "uuid";

const DisplayTask = ({ collection, updateTask }) => {
	const handleToggleCheck = async (task) => {
		const new_task = { ...task, check: !task.check };
		await updateTask(new_task);
	};

	const renderTask = (task) => {
		return (
			<motion.div
				// initial={{ scale: 0.8, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				exit={{ scale: 0.8, opacity: 0 }}
				onClick={() => handleToggleCheck(task)}
				transition={{}}
				layout
				key={task.check ? "complete-" : "uncomplete-" + task._id}
			>
				<Task name={task.name} check={task.check}></Task>
			</motion.div>
		);
	};

	const tasks_uncomplete = collection.list_tasks
		.filter((item) => item.check === false)
		.sort((a, b) => new Date(a.create_at) - new Date(b.create_at));

	const tasks_complete = collection.list_tasks
		.filter((item) => item.check === true)
		.sort((a, b) => new Date(a.finish_at) - new Date(b.finish_at));

	return (
		<div>
			<div className="uncomplete-task" key="uncomplete">
				<p>Tasks</p>
				<AnimatePresence mode="popLayout">
					{tasks_uncomplete.map(renderTask)}
				</AnimatePresence>
			</div>
			<div className="complete-task" key="complete">
				<p>Completed</p>
				<AnimatePresence mode="popLayout">
					{tasks_complete.map(renderTask)}
				</AnimatePresence>
			</div>
		</div>
	);
};

const TasksPage = () => {
	const {
		collectionState: { collectionView, collectionViewLoading },
		resetCollectionView,
		getOneCollection,
		updateTask,
	} = useContext(CollectionContext);

	const { taskState } = useContext(TaskContext);

	const navigate = useNavigate();

	const onClickBackToCollection = () => {
		navigate("/collections");
		resetCollectionView();
	};

	useEffect(() => {
		const collection_id = localStorage.getItem(COLLECTION_VIEW);
		getOneCollection(collection_id);
	}, []);

	let taskPage = null;

	taskPage = !collectionViewLoading && (
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

				<div className="task-title">{collectionView.name}</div>
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
					collection={collectionView}
					updateTask={updateTask}
				></DisplayTask>
			</div>
		</motion.div>
	);

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
			<AnimatePresence>{taskPage}</AnimatePresence>
		</motion.div>
	);
};

export default TasksPage;
