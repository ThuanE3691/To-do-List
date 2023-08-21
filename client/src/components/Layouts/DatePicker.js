import "../../css/DatePicker.css";
import left_arrow from "../../assets/DatePicker/left_arrow.png";
import right_arrow from "../../assets/DatePicker/right_arrow.png";
import double_left from "../../assets/DatePicker/double_left.png";
import double_right from "../../assets/DatePicker/double_right.png";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const DatePicker = () => {
	const monthLabel = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	const [dateDisplay, SetDateDisplay] = useState([]);

	const today = {
		day: new Date().getDate(),
		month: monthLabel[new Date().getMonth()],
		monthNumber: new Date().getMonth(),
		year: new Date().getFullYear(),
	};

	const [dateActive, SetDateActive] = useState(today);

	// const []

	const getDateClassName = (date, index) => {
		if (index === 0) {
			return "date-picker-date-article";
		} else {
			let base_name = "date-picker-date-unit";
			if (
				date.monthNumber !== dateActive.monthNumber ||
				(date.monthNumber === dateActive.monthNumber && date.day < today.day)
			)
				return base_name + " not-tick";
			if (date.day === dateActive.day) return base_name + " ticked";

			if (date.day === today.day && date.month === today.month)
				return base_name + " today";
			return base_name;
		}
	};

	const getNumDayOfMonth = (year, month) => {
		return new Date(year, month, 0).getDate();
	};

	const handleClickDate = (date) => {
		SetDateActive(date);
	};

	const dateGeneratorTest = () => {
		let date_array = [["Mo"], ["Tu"], ["We"], ["Th"], ["Fr"], ["Sa"], ["Su"]];
		let start = getNumDayOfMonth(today.year, today.monthNumber - 1);
		const endOfMonth = getNumDayOfMonth(today.year, today.monthNumber);

		date_array[0].push({
			day: start,
			month: monthLabel[new Date().getMonth()],
			monthNumber: today.monthNumber - 1,
			year: today.year,
		});
		for (let i = 0; i < 5; i++) {
			for (let j = 0; j < 7; j++) {
				let monthCurrent = today.monthNumber;

				if (start >= endOfMonth) {
					start = 1;
					monthCurrent += 1;
				} else start += 1;
				if (i === 0 && j === 0) continue;

				const dayStruct = {
					day: start,
					month: monthLabel[monthCurrent],
					monthNumber: monthCurrent,
					year: today.year,
				};

				date_array[j].push(dayStruct);
			}
		}

		SetDateDisplay(date_array);
	};

	useEffect(() => {
		dateGeneratorTest();
	}, []);

	return (
		<motion.div
			initial={{ x: -10, opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
			exit={{ x: -10, opacity: 0 }}
			className="date-picker-container"
		>
			<div className="date-picker-heading">
				<div className="date-picker-icon date-picker-prev-year">
					<img src={double_left} alt="" />
				</div>
				<div className="date-picker-icon date-picker-prev-month">
					<img src={left_arrow} alt="" />
				</div>
				<div className="date-picker-display-date">
					{dateActive.month} {dateActive.year}
				</div>
				<div className="date-picker-icon date-picker-next-month">
					<img src={right_arrow} alt="" />
				</div>
				<div className="date-picker-icon date-picker-next-year">
					<img src={double_right} alt="" />
				</div>
			</div>
			<div className="date-picker-body">
				{dateDisplay.map((date_column, column) => {
					return (
						<div className="date-picker-column" key={column}>
							{date_column.map((date, index) => {
								return (
									<motion.div
										className={getDateClassName(date, index)}
										transition={{ duration: 0 }}
										key={`${column}-${date.day}`}
										onClick={() => handleClickDate(date)}
									>
										{index !== 0 ? date.day : date}
									</motion.div>
								);
							})}
						</div>
					);
				})}
			</div>
			<div className="date-picker-bottom">
				<motion.button
					whileHover={{ opacity: 0.5 }}
					transition={{ duration: 0.2 }}
				>
					Cancel
				</motion.button>
				<motion.button
					whileHover={{ opacity: 0.6 }}
					transition={{ duration: 0.2 }}
				>
					Apply
				</motion.button>
			</div>
		</motion.div>
	);
};

export default DatePicker;
