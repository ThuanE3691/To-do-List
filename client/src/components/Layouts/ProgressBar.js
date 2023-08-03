import "../../css/progressBar.css";
import { useState, useEffect, useRef } from "react";

const ProgressBar = ({ target, total, color }) => {
	const progressRef = useRef(null);

	let [startedValue, SetStartedValue] = useState(-1);

	let speed_load = 10;

	let endValue = Math.round((target / total) * 100);

	useEffect(() => {
		let progressLoad;
		if (progressRef.current) {
			progressLoad = setInterval(() => {
				SetStartedValue((prevValue) => {
					const newValue = prevValue + 1;
					if (newValue === endValue) {
						clearInterval(progressLoad);
					}
					return newValue;
				});
			}, speed_load);
		}

		return () => {
			clearInterval(progressLoad);
		};
	}, [endValue]);

	useEffect(() => {
		if (progressRef.current) {
			progressRef.current.style.background = `conic-gradient(${color} ${
				startedValue * 3.6
			}deg, #32323F 0deg)`;
		}
	}, [startedValue]);

	return (
		<div className="skill">
			<div className="outer" ref={progressRef}>
				<div className="inter"></div>
			</div>
		</div>
	);
};

export default ProgressBar;
