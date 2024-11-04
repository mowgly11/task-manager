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
        if (!user) return res.send({ message: "an error just happened, Please relogin" });

        const taskObj = {
            task,
            date: Date.now(),
            status: false
        }

        user.tasks.push(taskObj);

        await user.save();

        return res.send({ message: "Added Successfully." });
    }
}