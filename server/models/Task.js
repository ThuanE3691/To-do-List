const mongoose = require("mongoose");
const { Schema } = mongoose;

const TaskSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	check: {
		type: Boolean,
		default: false,
	},
	deadline: {
		type: Date,
	},
	subTasks: {
		type: Array,
		items: {
			content: {
				type: String,
				required: true,
			},
			check: {
				type: Boolean,
				default: false,
			},
		},
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: "users",
	},
	in_collection: {
		type: Schema.Types.ObjectId,
		ref: "collections",
	},
	create_at: {
		type: Date,
		default: Date(),
	},
	finish_at: {
		type: Date,
		default: "",
	},
});

module.exports = mongoose.model("tasks", TaskSchema);
