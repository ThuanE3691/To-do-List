import "../css/collection.css";
import add from "../assets/add.png";
import Collection from "../components/Collections/Collection";
import CollectionCreate from "../components/Collections/CollectionCreate";
import { CollectionContext } from "../contexts/CollectionContext";
import { useContext, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { COLLECTION_VIEW } from "../contexts/constans";

const CollectionPage = () => {
	const {
		collectionState: { collections, collectionsLoading },
		getCollections,
		isOpenCreateCollection,
		SetIsOpenCreateCollection,
		resetCreateCollection,
	} = useContext(CollectionContext);

	const navigate = useNavigate();

	useEffect(() => {
		getCollections();
	}, []);

	const onClickCollection = (e, collection) => {
		localStorage.setItem(COLLECTION_VIEW, collection._id);
		navigate("/collections/tasks");
	};

	let collectionsBody = null;
	collectionsBody = collectionsLoading ? (
		<p className="loading-text">Waiting for loading collections...</p>
	) : collections.length !== 0 ? (
		collections.map((collection, index) => {
			return collection ? (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ delay: 0.1 * index, duration: 0.2 }}
					onClick={(e) => onClickCollection(e, collection)}
					key={"motion" + collection._id}
				>
					<Collection
						key={collection._id}
						name={collection.name}
						image={collection.image}
						color={collection.color}
						tasks={collection.list_tasks}
						index={index}
					></Collection>
				</motion.div>
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
		<>
			<motion.div
				className={`pg-collections-container ${
					isOpenCreateCollection ? "not_active" : ""
				}`}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				key="collection-page"
			>
				<div className="collections-head">
					<div className="title">Collections</div>
					<div className="three-dot"></div>
				</div>
				<div className="collections-display">
					<div className="dp fav-dp">Favourites</div>
					<div className="dp all-dp active">All Collections</div>
				</div>
				<motion.div className="collections-body">
					{collectionsBody}
					<motion.div
						className="collection-create"
						onClick={openCreateCollection}
						key="motion-create"
					>
						<img src={add} alt="Create collection" />
					</motion.div>
				</motion.div>
			</motion.div>
			<AnimatePresence>
				{isOpenCreateCollection && <CollectionCreate></CollectionCreate>}
			</AnimatePresence>
		</>
	);
};

export default CollectionPage;
