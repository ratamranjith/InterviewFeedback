const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/employeeModel');


mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("COnnected");
}).catch(() => {
    console.log("Not  Connected");
});

const user = new User({
    name: 'John Doe',
    email: 'johndoe@example.com'
});

(async function run() {
    const newUser = await user.save();
    console.log(newUser);
})();