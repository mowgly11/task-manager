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
                    tasks: [],
                    tasksCount: 0
                }).save();

                res.redirect("/login");
            } catch (err) {
                return res.redirect("/register");
            }
        });
    }
}