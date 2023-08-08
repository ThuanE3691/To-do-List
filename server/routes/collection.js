const express = require("express");
const router = express.Router();
const Collection = require("../models/Collection.js");
const axios = require("axios");
const verifyToken = require("../middleware/auth.js");
const { verify } = require("jsonwebtoken");

/// GET COLLECTION
const COLLECTION_URL = "http://localhost:5000/api/collections";

router.get("/", verifyToken, async (req, res) => {
	try {
		const collections = await Collection.find({ user: req.user_id }).populate(
			"list_tasks"
		);
		if (collections) {
			res.status(200).json({
				success: true,
				message: "Get All Collections Success",
				collections: collections,
			});
		}
	} catch (error) {
		res.status(400).json({
			success: false,
			message: "Internal Server",
			error: error.message,
		});
	}
});

/// @POST CREATE A NEW COLLECTION

router.post("/", verifyToken, async (req, res) => {
	const { name, image, color } = req.body;

	if (!name || !image) {
		return res.status(404).json({
			success: false,
			message: "You are missing a name or an image for this collection",
		});
	}

	try {
		// Check the collection has already been created
		let collection = await Collection.findOne({ name: name });
		if (collection) {
			return res.status(404).json({
				success: false,
				message: "You have already created this collection before",
			});
		}

		collection = new Collection({
			name: name,
			image: image,
			color: color,
			user: req.user_id,
		});

		await collection.save();

		return res.status(200).json({
			success: true,
			message: "You have create a new collection succesfully",
			new_collection: collection,
		});
	} catch (error) {
		res.status(400).json({
			success: false,
			message: "Internal Server",
			error: error.message,
		});
	}
});

/// @GET one collection

router.get("/:id", verifyToken, async (req, res) => {
	try {
		const collectionFindCondition = {
			_id: req.params.id,
			user: req.user_id,
		};
		const collection = await Collection.findOne(
			collectionFindCondition
		).populate("list_tasks");
		if (collection) {
			return res.status(200).json({
				success: true,
				message: "Find Collection Successfully",
				collection: collection,
			});
		} else {
			return res.status(404).json({
				success: false,
				message: "Collection Not Found",
			});
		}
	} catch (error) {
		res.status(400).json({
			success: false,
			message: "Internal Server",
			error: error.message,
		});
	}
});

module.exports = router;
