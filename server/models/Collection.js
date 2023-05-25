const mongoose = require("mongoose");
const { Schema } = mongoose;

const CollectionSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	image: {
		type: String,
		required: true,
	},
	tasks: {
		type: Array,
		items: {
			type: Schema.Types.ObjectId,
			ref: "tasks",
		},
		default: [],
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: "users",
	},
});

module.exports = mongoose.model("collections", CollectionSchema);
