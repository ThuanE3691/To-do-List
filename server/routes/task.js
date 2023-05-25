const express = require("express");
const router = express.Router({ mergeParams: true });
const Task = require("../models/Task.js");
const verifyToken = require("../middleware/auth.js");

//@ POST CREATE A TASK

router.post("/create", async function (req, res) {
	const { name, note, check, user_id, collection_id } = req.body;

	if (!user_id) {
		return res.status(400).json({
			success: false,
			message: "Access denied",
		});
	}

	if (!name) {
		return res.status(400).json({
			success: false,
			message: "Missing task name",
		});
	}

	if (!collection_id) {
		return res.status(400).json({
			success: false,
			message: "Task is not created from a collection, please create a new one",
		});
	}

	try {
		const new_task = new Task({
			name: name,
			note: note,
			check: check,
			user: user_id,
			collectionTasks: collection_id,
		});

		await new_task.save();
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

// Update Tasks
router.put("/:id/update", async (req, res) => {
	const { name, description, check } = req.body;
	if (!name) {
		return res.status(400).json({
			success: false,
			message: "Missing task name",
		});
	}

	try {
		let updatedTask = {
			name: name,
			description: description,
			check: check,
		};

		const taskUpdateCondition = {
			_id: req.params.id,
			user: req.user_id,
		};

		updatedTask = await Task.findOneAndUpdate(
			taskUpdateCondition,
			updatedTask,
			{
				new: true,
			}
		);

		if (!updatedTask) {
			return res.status(400).json({
				success: false,
				message: "Task not found or User not Authorized",
			});
		}

		res.status(200).json({
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

router.delete("/:id", async (req, res) => {
	try {
		const taskDeleteCondition = {
			_id: req.params.id,
			user: req.user_id,
		};

		deletedTask = await Task.findOneAndDelete(taskDeleteCondition);

		if (!deletedTask) {
			return res.status(400).json({
				success: false,
				message: "Task not found or User not Authorized",
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
