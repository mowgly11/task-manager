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
        const user = await User.findById(req.session.passport.user);

        console.log(task);

        user.tasks[`task_${user.tasksCount}`] = task;

        user.tasksCount += 1;
        
        user.save();

        res.send({ message: "Added Successfully." });
    }
}