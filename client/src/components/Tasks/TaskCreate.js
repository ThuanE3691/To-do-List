import "../../css/taskCreate.css";
import { generateFilter } from "../../utils/filterGenerator.js";
import folder from "../../assets/Task/folder.png";
import calendar from "../../assets/Task/calendar.png";
import { motion, AnimatePresence } from "framer-motion";
import DatePicker from "../Layouts/DatePicker";
import { useState } from "react";

export const TaskCreate = ({ collectionName, color, handleCloseTaskAdd }) => {
	const [showDatePicker, SetShowDatePicker] = useState(false);

	const handleShowDatePicker = () => {
		SetShowDatePicker((prev) => !prev);
	};

	const handleCloseBox = () => {
		SetShowDatePicker(false);
		handleCloseTaskAdd();
	};

	return (
		<>
			<motion.div
				initial={{
					opacity: 0,
					y: -10,
				}}
				animate={{
					opacity: 1,
					y: 0,
					filter: "blur(0px)",
					transition: {
						delay: 0.2,
						duration: 0.2,
					},
				}}
				exit={{
					opacity: 0,
					y: -10,
				}}
				className="task-create-container"
				key="task-create"
			>
				<div className="task-create-input">
					<input placeholder="Your task"></input>
				</div>
				<div className="task-create-middle">
					<motion.div
						className="task-create-collection"
						whileHover={{
							opacity: 0.6,
						}}
						transition={{
							duration: 0.2,
						}}
					>
						<img
							src={folder}
							alt=""
							style={{
								filter: generateFilter(color),
							}}
						/>
						<p>{collectionName}</p>
					</motion.div>
					<motion.div
						className="task-create-date"
						whileHover={{
							opacity: 0.6,
						}}
						transition={{
							duration: 0.2,
						}}
						onClick={handleShowDatePicker}
					>
						<img src={calendar} alt="" />
						<p>Date</p>
					</motion.div>
				</div>
				<div className="task-create-bottom">
					<button className="task-create-add">Add Task</button>
					<button className="task-create-cancel" onClick={handleCloseBox}>
						Cancel
					</button>
				</div>
			</motion.div>
			<AnimatePresence>
				{showDatePicker && <DatePicker></DatePicker>}
			</AnimatePresence>
		</>
	);
};
