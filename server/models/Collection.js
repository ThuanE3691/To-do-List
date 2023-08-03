const mongoose = require("mongoose");
const { Schema } = mongoose;

const CollectionSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	color: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		required: true,
	},
	list_tasks: [
		{
			type: Schema.Types.ObjectId,
			ref: "tasks",
		},
	],
	user: {
		type: Schema.Types.ObjectId,
		ref: "users",
	},
});

module.exports = mongoose.model("collections", CollectionSchema);
