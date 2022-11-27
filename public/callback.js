const { checkAuthenticated } = require('../middlewares');

module.exports = {
    name: "/callback",
    middleware: checkAuthenticated,
    runGET: async (req, res) => {
        res.redirect('/dashboard');
    }
}