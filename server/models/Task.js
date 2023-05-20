const mongoose = require('mongoose');
const {Schema} = mongoose

const TaskSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    note: {
        type: String
    },
    check: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('tasks', TaskSchema)
