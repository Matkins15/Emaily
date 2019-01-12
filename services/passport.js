const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

// A single argument 'users' indicates that we are 
// trying to fetch something out of mongoose.
// User is our model class
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    // user.id is the shortcut to the user _id.$oid in mongo
    done(null, user.id);
});

passport.deserializeUser((userId, done) => {
    User.findById(userId).then(user => {
        done(null, user)
    });
});

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: "/auth/google/callback",
            proxy: true,
        },
        (accessToken, refreshToken, profile, done) => {
            User.findOne({googleId: profile.id}).then((existingUser) => {
                if(existingUser) {
                    done(null, existingUser);
                } else {
                    // takes the user model instance and saves it to our database
                    new User({ googleId: profile.id }).save().then(user => done(null, user));
                }
            });
        }
    )
);