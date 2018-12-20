const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require('./config/keys')

require("./models/User");
require("./services/passport");

mongoose.connect(keys.mongoURI);

const app = express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

// requiring authRoutes file (which returns a function) and is immediately called with app object
require("./routes/authRoutes")(app);

// dynamic port: environment variable used by heroku to indentify a port || locally on port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT);
