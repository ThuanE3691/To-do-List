import "../../css/task.css";
import { motion } from "framer-motion";
import checkIcon from "../../assets/check.png";

const Task = ({ name, check }) => {
	return (
		<motion.div
			className="task-container"
			whileHover={{ opacity: 0.6 }}
			transition={{ duration: 0.2 }}
		>
			<div className="task-top">
				<div className="task-left">
					<div className={`task-checkbox ${check ? "complete" : ""}`}>
						{check && <img src={checkIcon} alt="" />}
					</div>
					<div className="task-name">{name}</div>
				</div>
			</div>
			<div className="task-sub-tasks"></div>
			<div className="task-deadline"></div>
		</motion.div>
	);
};

export default Task;
