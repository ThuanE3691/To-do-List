import "../../css/task.css";
import calendar from "../../assets/Task/calendar.png";
import { generateFilter } from "../../utils/filterGenerator.js";
import { AnimatePresence, motion } from "framer-motion";

const Task = ({ name, check, colorDisplay, deadline, removeMode }) => {
	const deadlineDate =
		deadline.toString() !== "Invalid Date"
			? `${deadline.getDate()} - ${
					deadline.getMonth() + 1
			  } - ${deadline.getFullYear()}`
			: null;
	return (
		<motion.div
			className="task-container"
			whileHover={{ opacity: 0.6 }}
			transition={{ duration: 0.2 }}
		>
			<div className="task-content">
				<div className="task-top">
					<div className="task-left">
						<motion.div
							className={`task-checkbox ${check ? "complete" : ""}`}
							style={{
								backgroundColor: check ? colorDisplay : "transparent",
								borderColor: colorDisplay,
							}}
						>
							{check && (
								<svg
									version="1.0"
									xmlns="http://www.w3.org/2000/svg"
									width="512.000000pt"
									height="512.000000pt"
									viewBox="0 0 512.000000 512.000000"
									preserveAspectRatio="xMidYMid meet"
								>
									<motion.path
										transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
										fill="#000000"
										stroke="none"
										d="M4605 4386 c-105 -33 -109 -36 -1445 -1372 l-1315 -1314 -595 595
									c-553 551 -600 596 -662 625 -159 74 -328 51 -454 -63 -100 -90 -149 -234
									-125 -364 25 -134 9 -117 839 -944 726 -724 771 -767 832 -794 78 -34 185 -44
									257 -25 122 33 70 -16 1629 1543 1614 1616 1522 1517 1547 1660 34 199 -91
									392 -292 453 -56 17 -162 17 -216 0z"
										initial={{ pathLength: 0 }}
										animate={{ pathLength: 1 }}
										transition={{
											duration: 0.5,
											delay: 0.2,
											ease: "easeInOut",
										}}
									/>
								</svg>
							)}
						</motion.div>
						<motion.div className="task-name">{name}</motion.div>
					</div>
				</div>
				<div className="task-bottom">
					<div className="task-sub-tasks"></div>
					{deadlineDate && (
						<div className="task-deadline">
							<img
								src={calendar}
								alt=""
								style={{
									filter: generateFilter(colorDisplay),
								}}
							/>
							<p style={{ color: colorDisplay }}>{deadlineDate}</p>
						</div>
					)}
				</div>
			</div>
			<AnimatePresence>
				{removeMode.active && (
					<motion.div
						className="task-remove"
						style={{ borderColor: colorDisplay }}
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						transition={{ duration: 0.2, easeInOut: "easeInOut" }}
					></motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	);
};

export default Task;
