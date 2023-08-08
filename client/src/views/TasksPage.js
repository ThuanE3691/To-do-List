import "../css/collection.css";
import { CollectionContext } from "../contexts/CollectionContext";
import { useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { COLLECTION_VIEW } from "../contexts/constans";
import "../css/tasksPage.css";
import back from "../assets/back.png";
import add from "../assets/add.png";
import { useNavigate } from "react-router-dom";
import Task from "../components/Collections/Task";
import { TaskContext } from "../contexts/TaskContext";

const TasksPage = () => {
	const {
		collectionState: { collectionView, collectionViewLoading },
		resetCollectionView,
		getOneCollection,
	} = useContext(CollectionContext);

	const navigate = useNavigate();

	const onClickBackToCollection = () => {
		navigate("/collections");
		resetCollectionView();
	};

	const onClickTask = ({ task }) => {};

	const displayTasks = (check_condition) => {
		return collectionView.list_tasks.map((task) => {
			return task.check === check_condition ? (
				<Task name={task.name} check={task.check}></Task>
			) : (
				""
			);
		});
	};

	useEffect(() => {
		const collection_id = localStorage.getItem(COLLECTION_VIEW);
		getOneCollection(collection_id);
	}, []);

	let taskPage = null;

	taskPage = collectionViewLoading ? (
		""
	) : (
		<>
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
				<div className="uncomplete-task">
					<p>Tasks</p>
					{displayTasks(false)}
				</div>
				<div className="complete-task">
					<p>Completed</p>
					{displayTasks(true)}
				</div>
			</div>
		</>
	);

	return (
		<div className="page">
			<div className="pg-task-container">{taskPage}</div>
		</div>
	);
};

export default TasksPage;
