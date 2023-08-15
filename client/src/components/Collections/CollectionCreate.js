import Form from "react-bootstrap/Form";
import book from "../../assets/book.png";
import cook from "../../assets/cook.png";
import clothes from "../../assets/clothes.png";
import code from "../../assets/code.png";
import design from "../../assets/design.png";
import home from "../../assets/home.png";
import shopping from "../../assets/shopping.png";
import user from "../../assets/user.png";
import work from "../../assets/work.png";
import close from "../../assets/close.png";
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
		isOpenCreateCollection,
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

		const { success, message } = await addCollection(newCollection);
		console.log(success, message);
		resetCreateCollection();
		SetIsOpenCreateCollection(false);
	};

	return (
		<motion.div
			className={`collection-box-create ${
				isOpenCreateCollection ? "active" : ""
			}`}
			exit={{ opacity: 0 }}
		>
			<Form>
				<div className="c-box-head">
					<p>Create New Collection</p>
					<img src={close} alt="close" onClick={onCloseCreateCollection} />
				</div>
				<div className="c-box-name">
					<p>Collection Name</p>
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
