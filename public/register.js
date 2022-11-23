const { checkNotAuthenticated } = require('../middlewares');
const User = require('../Schema');
const bcrypt = require('bcrypt');

module.exports = {
    name: "/register",
    middleware: checkNotAuthenticated,
    runGET: (req, res) => {
        delete require.cache[require.resolve("../views/register.ejs")];

        res.render("register.ejs");
    },

    runPOST: (req, res, next) => {
        User.findOne({
            email: req.body.email,
        }, async (err, data) => {
            console.log(data)
            if (err) throw new Error('Error: ' + err);
            if (data) return next("email already exists");
            try {
                new User({
                    email: req.body.email,
                    username: req.body.username,
                    password: await bcrypt.hash(req.body.password, 10),
                    // temporary solution
                    tasks: {
                        task1: "",
                        task2: "",
                        task3: "",
                        task4: "",
                        task5: "",
                        task6: "",
                        task7: "",
                        task8: "",
                        task9: "",
                        task10: "",
                        task11: "",
                        task12: "",
                        task13: "",
                        task14: "",
                        task15: "",
                        task16: "",
                        task17: "",
                        task18: "",
                        task19: "",
                        task20: "",
                        task21: "",
                        task22: "",
                        task23: "",
                        task24: "",
                        task25: "",
                        task26: "",
                        task27: "",
                        task28: "",
                        task29: "",
                        task30: "",
                    },
                    tasksCount: 0
                }).save();

                res.redirect("/login");
            } catch (err) {
                return res.redirect("/register");
            }
        });
    }
}