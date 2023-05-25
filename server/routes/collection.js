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
			"user",
			"username"
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
	const { name, image } = req.body;

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

/// @POST ADD A TASK TO THE Collection

router.post("/:id/tasks", verifyToken, async (req, res) => {
	try {
		const collection_id = req.params.id;
		const { name, note, check } = req.body;

		const collection = await Collection.findById(collection_id).populate(
			"name"
		);
		if (!collection) {
			return res.status(404).json({ error: "Collection not found" });
		}

		const taskData = await axios.post(
			`${COLLECTION_URL}/${collection_id}/tasks/create`,
			{
				name: name,
				note: note,
				check: check,
				collection_id: collection_id,
				user_id: req.user_id,
			}
		);

		if (taskData.data.success) {
			collection.tasks.push(taskData.data.task);
			await collection.save();

			return res.status(200).json({
				success: true,
				message: "Collection add task successfully",
				collection: collection,
				new_task_add: taskData.data.task,
			});
		} else {
			await axios.delete(
				`${COLLECTION_URL}/${collection_id}/tasks/${taskData._id}`,
				{
					user_id: req.user_id,
				}
			);

			return res.status(404).json({
				success: false,
				message: `Can't add task to collection because ${taskData.data.message}`,
				collection: collection.populate("name"),
				task_error: taskData.data.task,
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

/// @GET one collection
router.get("/:id", verifyToken, async (req, res) => {
	try {
		const collectionFindCondition = {
			_id: req.params.id,
			user: req.user_id,
		};
		const collection = await Collection.find(collectionFindCondition);
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

/// @PUT Change One Task of a Collection
router.put("/:id/tasks/:taskId", verifyToken, async (req, res) => {
	/// Find Collection
	const collectionFindCondition = {
		_id: req.params.id,
		user: req.user_id,
	};
	const collection = await Collection.find(collectionFindCondition);

	if (collection) {
		const task = collection.tasks.filter(
			(task) => task._id === req.params.taskId
		);
		if (task) {
			console.log(task);
		}
	}
});

module.exports = router;
