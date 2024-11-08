const { model, Schema } = require('mongoose');

const schema = new Schema({
    username: String,
    email: String,
    password: String,
    tasks: [
        {
            task: Object,
            date: Number,
            status: {
                type: Boolean,
                default: false
            }
        }
    ],
});

module.exports = new model("users", schema);