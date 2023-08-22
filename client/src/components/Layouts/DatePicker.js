import "../../css/DatePicker.css";
import left_arrow from "../../assets/DatePicker/left_arrow.png";
import right_arrow from "../../assets/DatePicker/right_arrow.png";
import double_left from "../../assets/DatePicker/double_left.png";
import double_right from "../../assets/DatePicker/double_right.png";
import { useEffect } from "react";
import { motion } from "framer-motion";

const dateVariant = {
	initial: {
		opacity: 0,
	},
	not_inital: {
		opacity: 1,
	},
	animate: {
		opacity: 1,
	},
	exit: {
		opacity: 0,
	},
	not_exit: {
		opacity: 1,
	},
};

const DateDisplayRender = ({
	dateDisplay,
	monthLabel,
	getDateClassName,
	handleClickDate,
}) => {
	return dateDisplay.date_array.map((date_column, column) => {
		return (
			<div
				className="date-picker-column"
				key={`${column} - ${monthLabel[dateDisplay.month]} - ${
					dateDisplay.year
				}`}
			>
				{date_column.map((date, index) => {
					return (
						<motion.div
							variants={dateVariant}
							initial={index !== 0 ? "initial" : "not_initial"}
							animate="animate"
							exit={index !== 0 ? "exit" : "not_exit"}
							transition={{ duration: 0.3 }}
							className={getDateClassName(date, index)}
							key={
								index !== 0
									? `${date_column[0]}-${date.day}-${date.month}-${date.year}`
									: date_column[0]
							}
							onClick={() => handleClickDate(date)}
						>
							{index !== 0 ? date.day : date}
						</motion.div>
					);
				})}
			</div>
		);
	});
};

const DatePicker = ({
	handleShowDatePicker,
	dateDisplay,
	SetDateDisplay,
	dateActive,
	SetDateActive,
}) => {
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

	const PREV_MONTH = "PREV_MONTH";
	const NEXT_MONTH = "NEXT_MONTH";
	const PREV_YEAR = "PREV_YEAR";
	const NEXT_YEAR = "NEXT_YEAR";

	const today = {
		day: new Date().getDate(),
		month: monthLabel[new Date().getMonth()],
		monthNumber: new Date().getMonth(),
		year: new Date().getFullYear(),
	};

	const isToday = (date) => {
		return (
			date.day === today.day &&
			date.month === today.month &&
			date.year === today.year
		);
	};

	const isTickedDate = (date) => {
		return (
			date.day === dateActive.day &&
			date.monthNumber === dateActive.monthNumber &&
			date.year === dateActive.year
		);
	};

	const isNotTickedDate = (date) => {
		return (
			date.monthNumber !== dateDisplay.month ||
			dateDisplay.year < today.year ||
			(dateDisplay.month < today.monthNumber && date.year <= today.year) ||
			(date.monthNumber === today.monthNumber &&
				date.year === today.year &&
				date.day < today.day)
		);
	};

	const getDateClassName = (date, index) => {
		if (index === 0) {
			return "date-picker-date-article";
		} else {
			let base_name = "date-picker-date-unit";

			if (isNotTickedDate(date)) return base_name + " not-tick";
			if (isTickedDate(date)) return base_name + " ticked";
			if (isToday(date)) return base_name + " today";

			return base_name;
		}
	};

	const getNumDayOfMonth = (year, month) => {
		return new Date(year, month, 0).getDate();
	};

	const getDayOfWeek = (year, month) => {
		let dateOfWeek = new Date(year, month, 1).getDay();
		if (dateOfWeek === 0) return 6;
		return dateOfWeek - 1;
	};

	const handleClickDate = (date) => {
		SetDateActive(date);
	};

	const dateGenerator = (date) => {
		let date_array = [["Mo"], ["Tu"], ["We"], ["Th"], ["Fr"], ["Sa"], ["Su"]];
		let day_display = 1;
		let month_of_day = date.monthNumber;

		const dateBegin = getDayOfWeek(date.year, date.monthNumber);
		const lastDateOfPrevMonth = getNumDayOfMonth(date.year, date.monthNumber);
		const endOfCurrentMonth = getNumDayOfMonth(date.year, date.monthNumber + 1);

		let count_prev = 0;
		for (let i = dateBegin - 1; i >= 0; i--) {
			date_array[i].push({
				day: lastDateOfPrevMonth - count_prev,
				month: monthLabel[date.monthNumber - 1],
				monthNumber: date.monthNumber - 1,
				year: date.year,
			});

			count_prev += 1;
		}

		for (let row = 0; row < 6; row++) {
			for (let week_day = 0; week_day < 7; week_day++) {
				if (row === 0 && week_day < dateBegin) continue;

				date_array[week_day].push({
					day: day_display,
					month: monthLabel[month_of_day],
					monthNumber: month_of_day,
					year: date.year,
				});

				if (day_display >= endOfCurrentMonth) {
					day_display = 1;
					month_of_day += 1;
				} else day_display += 1;
			}
		}

		SetDateDisplay({
			...dateDisplay,
			year: date.year,
			month: date.monthNumber,
			date_array,
		});
	};

	const handleChangeDateDisplay = (type) => {
		switch (type) {
			case PREV_MONTH:
				dateGenerator({
					monthNumber: dateDisplay.month - 1 >= 0 ? dateDisplay.month - 1 : 11,
					year:
						dateDisplay.month - 1 >= 0
							? dateDisplay.year
							: dateDisplay.year - 1,
				});
				break;
			case NEXT_MONTH:
				dateGenerator({
					monthNumber: dateDisplay.month + 1 <= 11 ? dateDisplay.month + 1 : 0,
					year:
						dateDisplay.month + 1 <= 11
							? dateDisplay.year
							: dateDisplay.year + 1,
				});
				break;
			case PREV_YEAR:
				dateGenerator({
					monthNumber: dateDisplay.month,
					year: dateDisplay.year - 1,
				});
				break;
			case NEXT_YEAR:
				dateGenerator({
					monthNumber: dateDisplay.month,
					year: dateDisplay.year + 1,
				});
				break;
			default:
				break;
		}
	};

	useEffect(() => {
		if (dateActive === null) {
			dateGenerator(today);
			SetDateActive(today);
		} else {
			dateGenerator(dateActive);
		}
	}, []);

	return (
		<motion.div
			initial={{ x: -10, opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
			exit={{ x: -10, opacity: 0 }}
			className="date-picker-container"
		>
			<div className="date-picker-heading">
				<div
					className="date-picker-icon date-picker-prev-year"
					onClick={() => handleChangeDateDisplay(PREV_YEAR)}
				>
					<img src={double_left} alt="" />
				</div>
				<div
					className="date-picker-icon date-picker-prev-month"
					onClick={() => handleChangeDateDisplay(PREV_MONTH)}
				>
					<img src={left_arrow} alt="" />
				</div>
				<div className="date-picker-display-date">
					{monthLabel[dateDisplay.month]} {dateDisplay.year}
				</div>
				<div
					className="date-picker-icon date-picker-next-month"
					onClick={() => handleChangeDateDisplay(NEXT_MONTH)}
				>
					<img src={right_arrow} alt="" />
				</div>
				<div
					className="date-picker-icon date-picker-next-year"
					onClick={() => handleChangeDateDisplay(NEXT_YEAR)}
				>
					<img src={double_right} alt="" />
				</div>
			</div>
			<div className="date-picker-body">
				<DateDisplayRender
					dateDisplay={dateDisplay}
					monthLabel={monthLabel}
					getDateClassName={getDateClassName}
					handleClickDate={handleClickDate}
				></DateDisplayRender>
			</div>
			<div className="date-picker-bottom">
				<motion.button
					whileHover={{ opacity: 0.5 }}
					transition={{ duration: 0.2 }}
					onClick={handleShowDatePicker}
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
