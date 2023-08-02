import "../css/collection.css";
import Collection from "../components/Collections/Collection";

const CollectionPage = () => {
	return (
		<div className="page">
			<div className="pg-collections-container">
				<div className="collections-head">
					<div className="title">Collections</div>
					<div className="three-dot"></div>
				</div>
				<div className="collections-display">
					<div className="dp fav-dp">Favourites</div>
					<div className="dp all-dp active">All Collections</div>
				</div>
				<div className="collections-body">
					<Collection></Collection>
					<Collection></Collection>
					<Collection></Collection>
					<Collection></Collection>
				</div>
			</div>
		</div>
	);
};

export default CollectionPage;
