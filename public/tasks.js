const { checkAuthenticated } = require('../middlewares');
const User = require('../Schema');
const moment = require('moment');

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
                if (task.status === false) args.push({
                    task: task.task,
                    since: moment(task.date).fromNow()
                });
            });

            res.render("tasks.ejs", { args });
        });
    },

    runPOST: async (req, res) => {
        User.findById(req.session.passport.user, async (err, data) => {
            if (err) return res.send({ message: "error finding data" });
            if (!data) return res.send({ message: "an error just happened, Please relogin" });

            let value = req.body.checked;

            if (!value) return res.send({ message: "Please Select A Task(s) to remove first" });

            if (typeof value === 'object') {
                value.forEach(val => {
                    data.tasks.splice(parseInt(val), 1)
                });
            } else if (typeof value === 'string') {
                data.tasks.splice(parseInt(value), 1)
            }

            await data.save();

            return res.send({ message: "Tasks Removed Successfully!" });
        });
    }
}