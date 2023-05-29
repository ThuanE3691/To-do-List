const mongoose = require("mongoose");
const { Schema } = mongoose;

const TaskSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	note: {
		type: String,
		default: "",
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
			name: {
				type: String,
				required: true,
			},
			note: {
				type: String,
				default: "",
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
});

module.exports = mongoose.model("tasks", TaskSchema);
