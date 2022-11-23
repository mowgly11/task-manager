const { model, Schema } = require('mongoose');

const schema = new Schema({
    username: String,
    email: String,
    password: String,
    tasks: {
        type: Object,
        default: {}
    },
    tasksCount: Number
});

module.exports = new model("users", schema);