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
import { useState, useContext } from "react";
import { CollectionContext } from "../../contexts/CollectionContext";
import "../../css/collectionCreate.css";

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
	} = useContext(CollectionContext);

	const onChangeCollection = (event, icon) => {
		if (!icon) {
			SetNewCollection({
				...newCollection,
				[event.target.name]: event.target.value,
			});
		} else {
			SetNewCollection({
				...newCollection,
				icon: icon,
			});
		}
	};

	const onCloseCreateCollection = () => {
		resetCreateCollection();
		SetIsOpenCreateCollection(false);
	};

	const onClickCreateCollection = (event) => {
		event.preventDefault();

		if (newCollection["name"] === "") {
			SetIsCompleteForm({
				...isCompleteForm,
				name: true,
			});
		}

		if (newCollection["icon"] === null) {
			SetIsCompleteForm({
				...isCompleteForm,
				icon: true,
			});
		}

		if (newCollection["name"] === "" || newCollection["icon"]) return;
	};

	return (
		<div
			className={`collection-box-create ${
				isOpenCreateCollection ? "active" : ""
			}`}
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
						{Object.keys(list_icon).map((icon) => {
							return (
								<div
									className={`collection-icon ${
										icon === newCollection["icon"]
											? "active"
											: isCompleteForm["icon"]
											? "not-fill"
											: ""
									}`}
									style={{
										backgroundColor: `${newCollection["color"]}`,
									}}
									onClick={(event) => onChangeCollection(event, icon)}
									name="icon"
								>
									<img
										src={list_icon[icon]}
										alt="collection-book"
										name="icon"
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
		</div>
	);
};

export default CollectionCreate;
