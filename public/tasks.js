const { checkAuthenticated } = require('../middlewares');
const User = require('../Schema');

module.exports = {
    name: "/tasks",
    middleware: checkAuthenticated,
    runGET: async (req, res) => {
        delete require.cache[require.resolve("../views/tasks.ejs")];

        let args = [];

        User.findById(req.session.passport.user, (err, data) => {
            if (err) return res.send({ message: "error finding data" });
            if (!data) return res.send({ message: "an error just happened, Please relogin" });

            const values = Object.values(data.tasks);
            values.forEach(value => {
                if(value !== '' && value !== undefined) args.push(value);
            });

            res.render("tasks.ejs", args);
        });
    },

    runPOST: async (req, res) => {

    }
}