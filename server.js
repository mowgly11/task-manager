const fs = require('node:fs');
const express = require('express');
const urlencoded = require('body-parser').urlencoded({
    extended: false
});
const { initMongoose } = require('./mongoConnection.js');
const User = require('./Schema');
const initializePassport = require('./passport-config');
const passport = require('passport');
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");
const config = require('./config.json');
const cookieParser = require('cookie-parser');

initializePassport(passport,
    async email => await User.findOne({
        email: email
    }),
    async id => await User.findOne({
        _id: id
    })
);

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 1;

initMongoose();

const app = express();

app.enable("trust proxy");
app.set("etag", false);
app.set("view engine", 'ejs');

app.use(express.static(__dirname + "/views"));
app.use(urlencoded);
app.use(flash());
app.use(cookieParser());
app.use(session({
    secret: config.sessionSecret,
    resave: false,
}));
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));

port = 80;

app.listen(port, () => console.log(`http://localhost:${port}`));

const files = fs.readdirSync('./public').filter(f => f.endsWith(".js"));

files.forEach(f => {
    const file = require(`./public/${f}`);

    if (file && file.name) {
        if (file.middleware) {
            app.get(file.name, file.middleware, file.runGET);
            if (file.runPOST) app.post(file.name, file.middleware, file.runPOST);
        }
        app.get(file.name, file.runGET);
        if (file.runPOST) app.post(file.name, file.runPOST);
    }
});

app.delete("/logout", (req, res, next) => {
    req.logOut((err) => {
        if (err) return next(err);
    });
    res.redirect("/login");
});