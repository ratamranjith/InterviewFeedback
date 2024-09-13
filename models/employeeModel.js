const mongoose = require('mongoose');


const addressSchema = mongoose.Schema({
    landmark: String,
    street: String,
    city: String,
    state: String,
    country: String
})

const previousCompanies = mongoose.Schema({
    CompanyName: String,
    CompanyType: String,
    YearsOfExperience: Number,
})

const userSchema = mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    address: addressSchema,
    referral: mongoose.SchemaTypes.ObjectId, // adding link to one to other document
    hobbies: [],
    designation: String,
    previousCompanies: previousCompanies,
    createdAt: Date,
    updatedAt: Date
});

const userModel = mongoose.model('Employee', userSchema);
module.exports = userModel;