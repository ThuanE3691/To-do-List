const express = require("express");
const router = express.Router();
const Collection = require("../models/Collection.js");
const Task = require("../models/Task.js");
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

/// Delete all task in a collection

router.delete("/:id", verifyToken, async (req, res) => {
	try {
		const collectionFindCondition = {
			_id: req.params.id,
			user: req.user_id,
		};
		const collection = await Collection.findOne(collectionFindCondition);
		if (collection) {
			let total_task = collection.list_tasks.length;

			const taskDeletePromises = [];

			for (const task_id of collection.list_tasks) {
				const taskDeleteCondition = {
					_id: task_id,
					user: req.user_id,
					in_collection: req.params.id,
				};

				const taskDeletePromise = Task.findOneAndDelete(taskDeleteCondition);
				taskDeletePromises.push(taskDeletePromise);
			}

			try {
				const deletedTasks = await Promise.all(taskDeletePromises);

				const successfullyDeletedTasks = deletedTasks.filter(
					(task) => task !== null
				);

				const unsuccessDeleteTasks = deletedTasks.filter(
					(task) => task === null
				);

				const deletedTaskCount = successfullyDeletedTasks.length;

				collection.list_tasks = unsuccessDeleteTasks;
				await collection.save();

				if (unsuccessDeleteTasks.length > 0) {
					return res.json({
						success: false,
						message: `Just deleted ${deletedTaskCount} tasks successfully, ${unsuccessDeleteTasks.length} tasks is not found`,
						collection: collection,
					});
				} else {
					return res.json({
						success: true,
						message: `Successfully deleted ${deletedTaskCount} out of ${total_task} tasks`,
						collection: collection,
					});
				}
			} catch (error) {
				return res
					.status(500)
					.json({ error: "An error occurred while deleting tasks" });
			}
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
