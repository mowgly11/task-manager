const { model, Schema } = require('mongoose');

const schema = new Schema({
    username: String,
    email: String,
    password: String,
    secretAccesskey: String,
    refresh_token: String,
    access_token: String,
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
    tasksCount: Number
});

module.exports = new model("users", schema);