module.exports = {
    name: "/",
    runGET: async (req, res) => {
        delete require.cache[require.resolve("../views/home.ejs")];

        res.render("home.ejs");
    }
}