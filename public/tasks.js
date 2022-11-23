const { checkAuthenticated } = require('../middlewares');

module.exports = {
    name: "/tasks",
    middleware: checkAuthenticated,
    runGET: async (req, res) => {
        delete require.cache[require.resolve("../views/tasks.ejs")];

        res.render("tasks.ejs");
    },

    runPOST: async (req, res) => {
        
    }
}