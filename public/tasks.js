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

            const task = data.tasks;

            let i = 0;
            while (i < data.tasks.length) {
                if (task[i].status === false) args.push({
                    task: task[i].task,
                    since: moment(task[i].date).fromNow()
                });
                i += 1
            }

            res.render("tasks.ejs", { args });
        });
    },

    runPOST: async (req, res) => {
        User.findById(req.session.passport.user, async (err, data) => {
            if (err) return res.send({ message: "error finding data" });
            if (!data) return res.send({ message: "an error just happened, Please relogin" });

            let value = req.body.checked;

            if (!value) return res.send({ message: "Please Select A Task(s) to remove first" });

            removeTasks(value, data);

            await data.save();

            return res.send({ message: "Tasks Removed Successfully!" });
        });
    }
}

function removeTasks(tasksArray, data) {
    tasksArray = tasksArray.reverse();

    for (let i = 0; i < tasksArray.length; i++) {
        data.tasks.splice(parseInt(tasksArray[i]), 1);
    };
}