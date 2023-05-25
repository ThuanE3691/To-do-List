const mongoose = require("mongoose");
const { Schema } = mongoose;

const TaskSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	note: {
		type: String,
	},
	check: {
		type: Boolean,
		default: false,
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: "users",
	},
	deadline: {
		type: Date,
	},
	collectionTasks: {
		type: Schema.Types.ObjectId,
		ref: "collections",
	},
	subTasks: {
		type: Array,
		items: {
			name: {
				type: String,
				required: true,
			},
			note: {
				type: String,
			},
			check: {
				type: Boolean,
				default: false,
			},
		},
		default: [],
	},
});

module.exports = mongoose.model("tasks", TaskSchema);
