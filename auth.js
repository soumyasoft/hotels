const passport = require("passport");
const localStartegy = require("passport-local").Strategy;
const Person = require("./models/Person");

passport.use(new localStartegy(async (username, password, done) => {
    // Authentication Logic
    try {
        //console.log("Received Credentials ", username, password);
        const user = await Person.findOne({ username: username });
        if (!user)
            return done(null, false, { message: 'Username is incorrect' });

        const isPasswordMatch = await user.comparePassword(password);

        if (isPasswordMatch) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'Password is incorrect' });
        }

    } catch (err) {
        return done(err);
    }
}))

module.exports = passport;