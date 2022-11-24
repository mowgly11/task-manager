const { checkAuthenticated } = require('../middlewares');
const User = require('../Schema');

module.exports = {
    name: "/tasks",
    middleware: checkAuthenticated,
    runGET: async (req, res) => {
        delete require.cache[require.resolve("../views/tasks.ejs")];

        User.findById(req.session.passport.user, (err, data) => {
            if (err) return res.send({ message: "error finding data" });
            if (!data) return res.send({ message: "an error just happened, Please relogin" });

            let args = [];

            data.tasks.forEach(task => {
                if (task.status === false) args.push(task.task);
            });

            res.render("tasks.ejs", { args });
        });
    },

    runPOST: async (req, res) => {
        User.findById(req.session.passport.user, async (err, data) => {
            if (err) return res.send({ message: "error finding data" });
            if (!data) return res.send({ message: "an error just happened, Please relogin" });

            let index;
            let value = req.body.checked;

            if (value == undefined) return res.send({ message: "Please Select A Task(s) to remove first" });

            if (typeof value === 'object') {
                value.forEach(val => {
                    data.tasks[parseInt(val)].status = true;
                });
            } else if (typeof value === 'string') {
                data.tasks[parseInt(value)].status = true;
            }

            await data.save();

            return res.send({ message: "Tasks Removed Successfully!" });
        });
    }
}