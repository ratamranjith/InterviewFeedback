const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/employeeModel');


mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("COnnected");
}).catch(() => {
    console.log("Not  Connected");
});

// 1st Approach - getting userData in a variable and then inserting into collection
/*const user = new User({
    name: 'John Doe',
    email: 'johndoe@example.com'
});

(async function run() {
    const newUser = await user.save();
    console.log(newUser);
})();*/
// 2nd Approach - 
async function run() {

    try {

        const newUser = await User.create({
            name: 'John date',
            email: 'johndoe123@example.com',
            age: 35,
            address: {
                landmark: "tea shop",
                street: '123 Main St',
                city: 'Anytown',
                state: 'CA',
                country: 'GB'
            },
            // referral: 'Truder',
            hobbies: ['Eating', 'sleeping', 'cooking'],
            designation: 'SDET-II',
            previousCompanies: {
                companyName: "xfgbhn",
                CompanyType: "Healthcare",
                YearsOfExperience: 8.6
            },
            createdAt: Date.now(),
            updatedAt: Date.now()
        });
        console.log(newUser);

        // Updating the value
        // newUser.name = 'truder';
        await newUser.save(); // Validation will happen only if save method is called for mongoose
    }
    catch (e) {
        console.log(e.message);

    }
}

run();