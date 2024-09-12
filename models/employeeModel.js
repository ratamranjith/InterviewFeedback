const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    email: String,
});

const userModel = mongoose.model('Employee', userSchema);
module.exports = userModel;