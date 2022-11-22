const { checkNotAuthenticated } = require('../middlewares');
const passport = require('passport');

module.exports = {
    name: "/login",
    middleware: checkNotAuthenticated,
    runGET: async (req, res) => {
        delete require.cache[require.resolve("../views/login.ejs")];

        res.render("login.ejs");
    },

    runPOST: passport.authenticate("local", {
        successRedirect: "/dashboard",
        failureRedirect: "/login",
        failureFlash: true
    })
}