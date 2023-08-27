import "../../css/taskCreate.css";
import { generateFilter } from "../../utils/filterGenerator.js";
import folder from "../../assets/Task/folder.png";
import calendar from "../../assets/Task/calendar.png";
import { motion, AnimatePresence } from "framer-motion";
import DatePicker from "../Layouts/DatePicker";
import { dateGenerator } from "../../utils/dateGenerator";
import { useState } from "react";
import { monthLabel } from "../Layouts/constants";

const taskVariants = {
	enter: {
		opacity: 0,
		y: -10,
	},
	display: {
		opacity: 1,
		y: 0,
		filter: "blur(0px)",
		transition: {
			delay: 0.2,
			duration: 0.2,
		},
	},
	exit: {
		opacity: 0,
		y: -10,
	},
};

const itemVariants = {
	whileHover: {
		opacity: 0.6,
	},
	transition: {
		duration: 0.2,
	},
};

export const TaskCreate = ({
	inCollection,
	handleCloseTaskAdd,
	addNewTask,
}) => {
	const [showDatePicker, SetShowDatePicker] = useState(false);
	const [dateDisplay, SetDateDisplay] = useState({
		year: null,
		month: null,
		date_array: [],
	});
	const [dateActive, SetDateActive] = useState(null);
	const [dateHistory, SetDateHistory] = useState(null);

	const today = {
		day: new Date().getDate(),
		month: new Date().getMonth(),
		monthLabel: monthLabel[new Date().getMonth()],
		year: new Date().getFullYear(),
	};

	const [taskName, SetTaskName] = useState("");

	const handleCancelDatePicker = () => {
		SetShowDatePicker(false);

		if (dateHistory) SetDateActive({ ...dateHistory });
		else SetDateActive(null);
	};

	const handleApplyDatePicker = () => {
		SetShowDatePicker(false);
		SetDateHistory({ ...dateActive });
	};

	const handleShowDatePicker = () => {
		if (showDatePicker) {
			handleCancelDatePicker();
		} else {
			let display_temp;
			if (dateActive === null) {
				SetDateActive({ ...today });
				display_temp = dateGenerator(today);
			} else display_temp = dateGenerator(dateActive);
			SetDateDisplay(display_temp);
			SetShowDatePicker(true);
		}
	};

	const handleCloseBox = () => {
		SetShowDatePicker(false);
		handleCloseTaskAdd();
	};

	const handleAddTask = async (event) => {
		event.preventDefault();

		if (taskName === "" || dateActive === null) return;

		const new_task = {
			name: taskName,
			check: false,
			deadline: new Date(dateActive.year, dateActive.month, dateActive.day),
		};

		await addNewTask(new_task, inCollection._id);
		handleCloseBox();
	};

	const renderDate = () => {
		try {
			if (dateActive === null) return "Date";
			return `${dateActive.day} - ${dateActive.month + 1} - ${dateActive.year}`;
		} catch (error) {
			return "Date";
		}
	};

	return (
		<>
			<motion.div
				variants={taskVariants}
				initial="enter"
				animate="display"
				exit="exit"
				className="task-create-container"
				key="task-create"
			>
				<div className="task-create-input">
					<input
						placeholder="Your task"
						value={taskName}
						onChange={(e) => SetTaskName(e.target.value)}
					></input>
				</div>
				<div className="task-create-middle">
					<motion.div
						className="task-create-collection"
						variants={itemVariants}
						whileHover="whileHover"
						transition="transition"
					>
						<img
							src={folder}
							alt=""
							style={{
								filter: generateFilter(inCollection.color),
							}}
						/>
						<p>{inCollection.name}</p>
					</motion.div>
					<motion.div
						className="task-create-date"
						variants={itemVariants}
						whileHover="whileHover"
						transition="transition"
						onClick={handleShowDatePicker}
					>
						<img src={calendar} alt="" />
						<p>{renderDate()}</p>
					</motion.div>
				</div>
				<div className="task-create-bottom">
					<button className="task-create-add" onClick={(e) => handleAddTask(e)}>
						Add Task
					</button>
					<button className="task-create-cancel" onClick={handleCloseBox}>
						Cancel
					</button>
				</div>
			</motion.div>
			<AnimatePresence>
				{showDatePicker && (
					<DatePicker
						handleCancelDatePicker={handleCancelDatePicker}
						handleApplyDatePicker={handleApplyDatePicker}
						dateDisplay={dateDisplay}
						SetDateDisplay={SetDateDisplay}
						dateActive={dateActive}
						SetDateActive={SetDateActive}
						today={today}
					></DatePicker>
				)}
			</AnimatePresence>
		</>
	);
};
