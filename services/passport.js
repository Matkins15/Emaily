const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

// A single argument 'users' indicates that we are 
// trying to fetch something out of mongoose.
// User is our model class
const User = mongoose.model('users');

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: "/auth/google/callback"
        },
        (accessToken, refreshToken, profile, done) => {
            // takes the user model instance and saves it to our database
            new User({ googleId: profile.id }).save();
        }
    )
);