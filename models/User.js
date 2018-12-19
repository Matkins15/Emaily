const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String
});

// telling mongoose that we want to create a new collection called users
mongoose.model('users', userSchema);

