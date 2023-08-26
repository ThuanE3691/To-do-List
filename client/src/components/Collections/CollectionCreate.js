import Form from "react-bootstrap/Form";
import book from "../../assets/Collections/book.png";
import cook from "../../assets/Collections/cook.png";
import clothes from "../../assets/Collections/clothes.png";
import code from "../../assets/Collections/code.png";
import design from "../../assets/Collections/design.png";
import home from "../../assets/Collections/home.png";
import shopping from "../../assets/Collections/shopping.png";
import user from "../../assets/Collections/user.png";
import work from "../../assets/Collections/work.png";
import close from "../../assets/Other/close.png";
import { useContext } from "react";
import { CollectionContext } from "../../contexts/CollectionContext";
import "../../css/collectionCreate.css";
import { motion } from "framer-motion";

const CollectionCreate = () => {
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

	const {
		newCollection,
		SetNewCollection,
		isCompleteForm,
		SetIsCompleteForm,
		resetCreateCollection,
		SetIsOpenCreateCollection,
		addCollection,
	} = useContext(CollectionContext);

	const onChangeCollection = (event, image) => {
		if (!image) {
			SetNewCollection({
				...newCollection,
				[event.target.name]: event.target.value,
			});
		} else {
			SetNewCollection({
				...newCollection,
				image: image,
			});
		}
	};

	const onCloseCreateCollection = () => {
		resetCreateCollection();
		SetIsOpenCreateCollection(false);
	};

	const onClickCreateCollection = async (event) => {
		event.preventDefault();

		if (newCollection["name"] === "" || newCollection["icon"] === null) {
			SetIsCompleteForm({
				...isCompleteForm,
				name: newCollection["name"] === "" ? true : false,
				icon: newCollection["icon"] === null ? true : false,
			});
			return;
		}

		await addCollection(newCollection);
		resetCreateCollection();
		SetIsOpenCreateCollection(false);
	};

	return (
		<motion.div
			className={`collection-box-create active`}
			initial={{ opacity: 0, y: -10 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -10 }}
			transition={{ duration: 0.3 }}
			key="collection-create"
		>
			<Form>
				<div className="c-box-head">
					<p>Create New Collection</p>
					<img src={close} alt="close" onClick={onCloseCreateCollection} />
				</div>
				<div className="c-box-name">
					<p>Name</p>
					<input
						className={isCompleteForm["name"] ? "not-fill" : ""}
						placeholder="Collection Name"
						value={newCollection["name"]}
						onChange={(e) => onChangeCollection(e)}
						name="name"
					></input>
				</div>
				<div className="c-box-icon">
					<p>Icon</p>
					<div className="c-box-icon-container">
						{Object.keys(list_icon).map((image) => {
							return (
								<div
									className={`collection-icon ${
										image === newCollection["image"]
											? "active"
											: isCompleteForm["icon"]
											? "not-fill"
											: ""
									}`}
									style={{
										backgroundColor: `${newCollection["color"]}`,
									}}
									onClick={(event) => onChangeCollection(event, image)}
									name="image"
									key={image}
								>
									<img
										src={list_icon[image]}
										alt="collection-book"
										name="image"
									/>
								</div>
							);
						})}
					</div>
				</div>
				<div className="c-box-color">
					<p>Color</p>
					<div className="color-picker-area">
						<input
							type="color"
							value={newCollection["color"]}
							onChange={(e) => onChangeCollection(e)}
							name="color"
						></input>
						<p>{newCollection["color"]}</p>
					</div>
				</div>
				<button
					className="c-box-button"
					onClick={(event) => onClickCreateCollection(event)}
				>
					Create
				</button>
			</Form>
		</motion.div>
	);
};

export default CollectionCreate;
