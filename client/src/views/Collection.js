import "../css/collection.css";
import add from "../assets/add.png";
import Collection from "../components/Collections/Collection";
import CollectionCreate from "../components/Collections/CollectionCreate";
import { CollectionContext } from "../contexts/CollectionContext";
import { useContext, useEffect } from "react";

const CollectionPage = () => {
	const {
		collectionState: { collections, collectionsLoading },
		getCollections,
		isOpenCreateCollection,
		SetIsOpenCreateCollection,
		resetCreateCollection,
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

	const openCreateCollection = () => {
		resetCreateCollection();
		SetIsOpenCreateCollection(true);
	};

	return (
		<div className="page">
			<div
				className={`pg-collections-container ${
					isOpenCreateCollection ? "not_active" : ""
				}`}
			>
				<div className="collections-head">
					<div className="title">Collections</div>
					<div className="three-dot"></div>
				</div>
				<div className="collections-display">
					<div className="dp fav-dp">Favourites</div>
					<div className="dp all-dp active">All Collections</div>
				</div>
				<div className="collections-body">
					{collectionsBody}
					<div className="collection-create" onClick={openCreateCollection}>
						<img src={add} alt="Create collection" />
					</div>
				</div>
			</div>
			<CollectionCreate></CollectionCreate>
		</div>
	);
};

export default CollectionPage;
