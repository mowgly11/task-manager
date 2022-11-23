const { checkAuthenticated } = require('../middlewares');
const User = require('../Schema');

module.exports = {
    name: "/dashboard",
    middleware: checkAuthenticated,
    runGET: async (req, res) => {
        delete require.cache[require.resolve("../views/dashboard.ejs")];

        res.render("dashboard.ejs");
    },

    runPOST: async (req, res) => {
        const task = req.body.task;

        User.findOne({
            _id: req.session.passport.user
        }, async (err, data) => {
            if (err) return res.send({ message: "error saving data" });
            if (!data) return res.send({ message: "an error just happened, Please relogin" });

            for (i = 0; i <= 30; i++) {
                if (data.tasks[`task${[i]}`] == "") {
                    data.tasks[`task${[i]}`] = task;
                    break;
                }
            }

            data.tasksCount += 1;

            await data.save();

            console.log(data);

            res.send({ message: "Added Successfully." });
        });
    }
}