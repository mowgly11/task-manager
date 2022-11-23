const { model, Schema } = require('mongoose');

const schema = new Schema({
    username: String,
    email: String,
    password: String,
    tasks: {
        task1: String,
        task2: String,
        task3: String,
        task4: String,
        task5: String,
        task6: String,
        task7: String,
        task8: String,
        task9: String,
        task10: String,
        task11: String,
        task12: String,
        task13: String,
        task14: String,
        task15: String,
        task16: String,
        task17: String,
        task18: String,
        task19: String,
        task20: String,
        task21: String,
        task22: String,
        task23: String,
        task24: String,
        task25: String,
        task26: String,
        task27: String,
        task28: String,
        task29: String,
        task30: String,
    },
    tasksCount: Number
});

module.exports = new model("users", schema);