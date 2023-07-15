const express = require("express");
const router = express.Router({ mergeParams: true });
const Collection = require("../models/Collection.js");
const Task = require("../models/Task.js");
const verifyToken = require("../middleware/auth.js");

//@ POST CREATE A TASK

router.post("/", verifyToken, async (req, res) => {
	const collection_id = req.params.id;

	const collectionFindCondition = {
		user: req.user_id,
		_id: collection_id,
	};

	const collection = await Collection.findOne(collectionFindCondition);

	if (!req.body.name) {
		return res.status(400).json({
			success: false,
			message: "Missing task name",
		});
	}

	if (!collection) {
		return res.status(400).json({
			success: false,
			message: "Task is not created from a collection, please create a new one",
		});
	}

	try {
		const new_task = new Task({
			...req.body,
			user: req.user_id,
			in_collection: collection_id,
		});
		await new_task.save();
		collection.list_tasks.push(new_task._id);
		await collection.save();
		return res.status(200).json({
			success: true,
			message: "Task created successfully",
			task: new_task,
		});
	} catch (error) {
		res.status(400).json({
			success: false,
			message: "Internal Server",
			error: error.message,
		});
	}
});

router.put("/:task_id", verifyToken, async (req, res) => {
	try {
		const taskFindCondition = {
			_id: req.params.task_id,
			user: req.user_id,
			in_collection: req.params.id,
		};

		const updatedTask = await Task.findOneAndUpdate(
			taskFindCondition,
			{
				...req.body,
			},
			{
				new: true,
			}
		);

		if (!updatedTask) {
			return res.status(400).json({
				success: false,
				message: "Task not found",
			});
		}

		return res.status(200).json({
			success: true,
			message: "Task updated successfully",
			task: updatedTask,
		});
	} catch (error) {
		res.status(400).json({
			success: false,
			message: "Internal Server",
			error: error.message,
		});
	}
});

router.delete("/:task_id", verifyToken, async (req, res) => {
	try {
		const collectionDeleteTaskCondition = {
			_id: req.params.id,
			user: req.user_id,
		};

		const taskDeleteCondition = {
			_id: req.params.task_id,
			user: req.user_id,
			in_collection: req.params.id,
		};

		const CollectiondeletedTask = await Collection.findOneAndUpdate(
			collectionDeleteTaskCondition,
			{
				$pull: {
					list_tasks: req.params.task_id,
				},
				new: true,
			}
		);

		if (!CollectiondeletedTask) {
			return res.status(400).json({
				success: false,
				message: "Don't found task in collection to delete",
			});
		}

		const deletedTask = await Task.findOneAndDelete(taskDeleteCondition);

		if (!deletedTask) {
			return res.status(400).json({
				success: false,
				message: "Task not found to deleted",
			});
		}

		res.status(200).json({
			success: true,
			message: "Task Delete successfully",
			deletedTask: deletedTask,
		});
	} catch (error) {
		res.status(400).json({
			success: false,
			message: "Internal Server",
			error: error.message,
		});
	}
});
module.exports = router;
