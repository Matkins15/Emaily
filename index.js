const express = require("express");
const mongoose = require("mongoose");
const keys = require('./config/keys')

require("./services/passport");

mongoose.connect(keys.mongoURI);

const app = express();

// requiring authRoutes file (which returns a function) and is immediately called with app object
require("./routes/authRoutes")(app);

// dynamic port: environment variable used by heroku to indentify a port || locally on port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT);
