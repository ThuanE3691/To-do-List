import book from "../../assets/book.png";
import cook from "../../assets/cook.png";
import clothes from "../../assets/clothes.png";
import code from "../../assets/code.png";
import design from "../../assets/design.png";
import home from "../../assets/home.png";
import shopping from "../../assets/shopping.png";
import user from "../../assets/user.png";
import work from "../../assets/work.png";
import ProgressBar from "../Layouts/ProgressBar.js";
import { motion } from "framer-motion";

const Collection = ({ name, image, color, tasks, index }) => {
	const nums_tasks = tasks.length;

	const list_icon = {
		book: book,
		cook: cook,
		clothes: clothes,
		code: code,
		design: design,
		home: home,
		shopping: shopping,
		work: work,
		user: user,
	};

	let tasks_complete = tasks.reduce((acc, task) => {
		return acc + (task.check === true ? 1 : 0);
	}, 0);

	return (
		<motion.div
			whileHover={{ opacity: 0.6 }}
			transition={{ duration: 0.2 }}
			className="collection-container"
		>
			<div
				className="collection-icon"
				style={{
					backgroundColor: color,
				}}
			>
				<img src={list_icon[image]} alt="collection-book" />
			</div>
			<div className="collection-name">{name}</div>
			<div className="collection-progress">
				<p>
					{nums_tasks > 0
						? `${tasks_complete}/${nums_tasks} done`
						: "Not have any tasks"}
				</p>
				{nums_tasks > 0 ? (
					<ProgressBar
						target={tasks_complete}
						total={nums_tasks}
						color={color}
					></ProgressBar>
				) : (
					""
				)}
			</div>
		</motion.div>
	);
};

export default Collection;
