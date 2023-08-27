const getLastMonthDate = (year, month) => {
	return new Date(year, month, 0);
};

const getDayOfWeek = (year, month) => {
	let dateOfWeek = new Date(year, month, 1).getDay();
	if (dateOfWeek === 0) return 6;
	return dateOfWeek - 1;
};

export const dateGenerator = (date) => {
	let date_array = [["Mo"], ["Tu"], ["We"], ["Th"], ["Fr"], ["Sa"], ["Su"]];

	const dateBegin = getDayOfWeek(date.year, date.month);
	const prevMonth = getLastMonthDate(date.year, date.month);
	const currentMonth = getLastMonthDate(date.year, date.month + 1);

	let date_render = {
		day: prevMonth.getDate() - dateBegin + 1,
		month: prevMonth.getMonth(),
		year: prevMonth.getFullYear(),
	};

	if (date_render.day === 32) {
		date_render.day = 1;
		date_render.month = date.month;
		date_render.year = date.year;
	}

	const isInTheLastMonth = (month) => {
		return (
			date_render.month === month.getMonth() &&
			date_render.day >= month.getDate()
		);
	};

	const nextMonth = () => {
		date_render.day = 1;
		if (date_render.month !== 11) {
			date_render.month += 1;
		} else {
			date_render.month = 0;
			date_render.year += 1;
		}
	};

	for (let row = 0; row < 6; row++) {
		for (let week_day = 0; week_day < 7; week_day++) {
			date_array[week_day].push({ ...date_render });

			if (isInTheLastMonth(prevMonth) || isInTheLastMonth(currentMonth)) {
				nextMonth(date_render);
			} else date_render.day += 1;
		}
	}

	return { month: date.month, year: date.year, date_array: date_array };
};
