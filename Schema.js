const { model, Schema } = require('mongoose');

const schema = new Schema({
    username: String,
    email: String,
    password: String,
});

module.exports = new model("users", schema);