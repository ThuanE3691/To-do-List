import book from "../../assets/book.png";

const Collection = () => {
	return (
		<div className="collection-container">
			<div className="collection-icon">
				<img src={book} alt="collection-book" />
			</div>
			<div className="collection-name">School</div>
			<div className="collection-progress">4/8 done</div>
		</div>
	);
};

export default Collection;
