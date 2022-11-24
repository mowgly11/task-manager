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

        user.tasks.push(`task${user.tasksCount}:${task}`);

        await user.save();

        console.log(user)

        res.send({ message: "Added Successfully." });
    }
}