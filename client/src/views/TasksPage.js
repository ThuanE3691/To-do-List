import "../css/collection.css";
import { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
	COLLECTION_VIEW,
	REMOVE_TYPE_ALL,
	REMOVE_TYPE_CHOOSE,
} from "../contexts/constants";
import "../css/tasksPage.css";
import back from "../assets/Other/back.png";
import add from "../assets/Other/add.png";
import deleteOne from "../assets/Other/delete.png";
import deleteAll from "../assets/Other/delete-all.png";
import { useNavigate } from "react-router-dom";
import Task from "../components/Tasks/Task";
import { TaskContext } from "../contexts/TaskContext";
import { TaskCreate } from "../components/Tasks/TaskCreate";

const DisplayTask = ({ colorDisplay, removeMode }) => {
	const { finishTasks, notFinishTasks, updateTask } = useContext(TaskContext);

	const handleToggleCheck = async (task, taskIndex) => {
		if (!removeMode.active) {
			const new_task = { ...task, check: !task.check };
			await updateTask(new_task, taskIndex);
		}
	};

	const renderTask = (task, index) => {
		return (
			<motion.div
				initial={{ y: -20, scale: 0.6, opacity: 0 }}
				animate={{ y: 0, scale: 1, opacity: 1 }}
				exit={{ scale: 0.6, opacity: 0 }}
				onClick={() => handleToggleCheck(task, index)}
				transition={{ duration: 0.3 }}
				layout
				key={task._id}
			>
				<Task
					name={task.name}
					check={task.check}
					colorDisplay={colorDisplay}
					deadline={new Date(task.deadline)}
					removeMode={removeMode}
				></Task>
			</motion.div>
		);
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			key="display-render"
		>
			<div className="incomplete-task" key="incomplete">
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
		</motion.div>
	);
};

const TasksContainer = ({
	inCollection,
	removeMode,
	handleOnClickTaskOption,
}) => {
	const { SetShowAddTask } = useContext(TaskContext);

	const navigate = useNavigate();

	const onClickBackToCollection = () => {
		navigate("/collections");
	};

	const handleOpenTaskAdd = () => {
		SetShowAddTask(true);
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			key="task-display"
		>
			<div className="task-header">
				<div className="task-header-left">
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
				<div className="task-header-right">
					<motion.img
						src={deleteOne}
						alt=""
						whileHover={{ opacity: 0.6 }}
						transition={{ duration: 0.2 }}
						onClick={() => handleOnClickTaskOption(REMOVE_TYPE_CHOOSE)}
					/>
					<motion.img
						src={deleteAll}
						alt=""
						whileHover={{ opacity: 0.6 }}
						transition={{ duration: 0.2 }}
						onClick={() => handleOnClickTaskOption(REMOVE_TYPE_ALL)}
					/>
				</div>
			</div>
			<motion.div
				className="add-task-area"
				whileHover={{ opacity: 0.6 }}
				transition={{ duration: 0.2 }}
				onClick={handleOpenTaskAdd}
			>
				<div
					className="add-task-icon"
					style={{ backgroundColor: inCollection.color }}
				>
					<img src={add} alt="" />
				</div>
				<p>Add a task</p>
			</motion.div>
			<div className="task-display-area">
				<AnimatePresence>
					<DisplayTask
						colorDisplay={inCollection.color}
						removeMode={removeMode}
					></DisplayTask>
				</AnimatePresence>
			</div>
		</motion.div>
	);
};

const pageVariants = {
	enter: {
		opacity: 0,
	},
	normal: {
		opacity: 1,
	},
	showTaskCreate: {
		filter: "blur(6px)",
		opacity: 1,
		transition: {
			duration: 0.2,
		},
		pointerEvents: "none",
	},
	exit: {
		opacity: 0,
	},
};

const TasksPage = () => {
	const {
		taskState: { inCollection, tasksLoading },
		getTaskFromCollection,
		showAddTask,
		removeAllTasks,
	} = useContext(TaskContext);

	const [removeMode, SetRemoveMode] = useState({
		active: false,
		list_remove: [],
	});

	const handleOnClickTaskOption = (type) => {
		switch (type) {
			case REMOVE_TYPE_CHOOSE:
				SetRemoveMode({ ...removeMode, active: !removeMode.active });
				break;
			case REMOVE_TYPE_ALL:
				removeAllTasks();
				break;
			default:
				break;
		}
	};

	useEffect(() => {
		const collection_id = localStorage.getItem(COLLECTION_VIEW);
		getTaskFromCollection(collection_id);
	}, []);

	return (
		<>
			<motion.div
				key="task-page"
				className="pg-task-container"
				variants={pageVariants}
				initial="enter"
				animate={showAddTask ? "showTaskCreate" : "normal"}
				exit="exit"
			>
				<AnimatePresence>
					{!tasksLoading && (
						<>
							<TasksContainer
								inCollection={inCollection}
								removeMode={removeMode}
								handleOnClickTaskOption={handleOnClickTaskOption}
							></TasksContainer>
						</>
					)}
				</AnimatePresence>
			</motion.div>
			<AnimatePresence>
				{showAddTask && <TaskCreate inCollection={inCollection}></TaskCreate>}
			</AnimatePresence>
		</>
	);
};

export default TasksPage;
