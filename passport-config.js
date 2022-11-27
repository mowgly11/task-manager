const bcrypt = require('bcrypt');
const localStrategy = require('passport-local').Strategy;

function initialize(passport, getUserByEmail, getUserById) {
    const authenticateUser = async (email, password, done) => {
        const user = await getUserByEmail(email);
        if (user == null) {
            return done(null, false, {
                message: "There is no user with that email!"
            });
        }
        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user)
            } else {
                return done(null, false, {
                    message: "Wrong Password!"
                })
            }
        } catch (err) {
            return done(err)
        }
    }

    passport.use(new localStrategy({
        usernameField: "email",
    }, authenticateUser));
    passport.serializeUser((user, done) => done(null, user._id));
    passport.deserializeUser((id, done) => {
        return done(null, getUserById(id))
    });
}

module.exports = initialize;