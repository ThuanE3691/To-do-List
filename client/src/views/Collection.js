import "../css/collection.css";
import Collection from "../components/Collections/Collection";
import { CollectionContext } from "../contexts/CollectionContext";
import { useContext, useEffect } from "react";

const CollectionPage = () => {
	const {
		collectionState: { collections, collectionsLoading },
		getCollections,
	} = useContext(CollectionContext);

	useEffect(() => {
		getCollections();
	}, []);

	let collectionsBody = null;
	collectionsBody =
		collections.length !== 0 ? (
			collections.map((collection) => {
				return collection ? (
					<Collection
						name={collection.name}
						image={collection.image}
						color={collection.color}
						tasks={collection.list_tasks}
					></Collection>
				) : (
					<></>
				);
			})
		) : (
			<p className="collection-notice">
				You haven't created a collection. Let's create one!
			</p>
		);

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
				<div className="collections-body">{collectionsBody}</div>
			</div>
		</div>
	);
};

export default CollectionPage;
