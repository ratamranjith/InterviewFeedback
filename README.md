# Mongoose Simplified

## Table of Contents

1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Connecting to MongoDB](#connecting-to-mongodb)
4. [Defining Schemas](#defining-schemas)
   - 4.1 [Schema Types](#schema-types)
   - 4.2 [Virtuals](#virtuals)
   - 4.3 [Middleware](#middleware)
   - 4.4 [Schema Methods](#schema-methods)
5. [Creating Models](#creating-models)
6. [CRUD Operations](#crud-operations)
   - 6.1 [Create](#create)
   - 6.2 [Read](#read)
   - 6.3 [Update](#update)
   - 6.4 [Delete](#delete)
7. [Mongoose Queries](#mongoose-queries)
   - 7.1 [Query Helpers](#query-helpers)
   - 7.2 [Advanced Queries](#advanced-queries)
8. [Population](#population)
9. [Indexes](#indexes)
10. [Validations](#validations)
11. [Error Handling](#error-handling)
12. [Plugins](#plugins)
13. [Transactions](#transactions)
14. [Aggregation Framework](#aggregation-framework)
15. [Performance Optimization](#performance-optimization)
16. [Mongoose vs. Native MongoDB Driver](#mongoose-vs-native-mongodb-driver)
17. [References](#references)

---

## Introduction

Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment. It provides a schema-based solution to model your application data.

## Installation

```node
npm install mongoose
```

## Connecting to MongoDB

```node
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected!"))
  .catch((err) => console.log(err));
```

## 4. Defining Schemas

In Mongoose, schemas define the structure of the documents in a MongoDB collection. A schema specifies what fields a document can have and what type those fields will be.

Example:

```node
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  age: Number,
  email: String,
});
```

### 4.1 Schema Types

Schema types in Mongoose allow you to specify what kind of data a field in a document should hold. Some of the common schema types include:

- **String**: For textual data.
- **Number**: For numbers (integers or floating-point).
- **Boolean**: For true/false values.
- **Date**: For date and time values.
- **Array**: For lists of values.

#### Example:

```javascript
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  isAdmin: Boolean,
  createdAt: { type: Date, default: Date.now },
  interests: [String], // Array of strings
});
```

### 4.2 Virtuals

Virtuals are fields that are not saved to the database but can be used to represent computed values. For example, you can define a fullName virtual that concatenates firstName and lastName.

#### Example:

```javascript
userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

const User = mongoose.model("User", userSchema);
const user = new User({ firstName: "John", lastName: "Doe" });
console.log(user.fullName); // Output: John Doe
```

### 4.3 Middleware

Mongoose middleware allows you to define pre and post hooks for various operations, such as saving or deleting documents. Middleware is useful for running logic before or after a certain action is performed.

Example:

```javascript
userSchema.pre("save", function (next) {
  console.log("A user is about to be saved.");
  next();
});

userSchema.post("save", function (doc, next) {
  console.log("User has been saved:", doc);
  next();
});
```

### 4.4 Schema Methods

Schema methods allow you to add custom instance methods to your schema. These methods can be used on individual document instances.

Example:

```javascript
userSchema.methods.isAdult = function () {
  return this.age >= 18;
};

const User = mongoose.model("User", userSchema);
const user = new User({ name: "Alice", age: 20 });
console.log(user.isAdult()); // Output: true
```

## 5. Creating Models

Once you've defined a schema, you can create a model based on it. A model in Mongoose represents a collection in the database, and you can interact with the collection using this model.

Example:

```javascript
const User = mongoose.model("User", userSchema);
```

#### With the User model, you can now perform CRUD (Create, Read, Update, Delete) operations.

## 6. CRUD Operations

### 6.1 Create

To create and save a new document to the database, you can use the save() method or the create() method.

**Note:** Alternatively, you can use create() instead of save
Example:

```javascript
// Save
const newUser = new User({ name: "Bob", age: 25 });
newUser.save((err, user) => {
  if (err) return console.error(err);
  console.log("User created:", user);
});

// Create
User.create({ name: "Alice", age: 30 }, (err, user) => {
  if (err) return console.error(err);
  console.log("User created:", user);
});
```

### 6.2 Read

You can read or query data from the database using methods like find(), findById(), or findOne().

Example:

```javascript
User.find({}, (err, users) => {
  if (err) return console.error(err);
  console.log("Users:", users);
});
```

### 6.3 Update

To update an existing document, you can use findByIdAndUpdate() or updateOne().

Example:

```javascript
User.findByIdAndUpdate("userId", { age: 35 }, (err, user) => {
  if (err) return console.error(err);
  console.log("User updated:", user);
});
```

### 6.4 Delete

To delete a document, you can use findByIdAndDelete() or deleteOne().

Example:

```javascript
User.findByIdAndDelete("userId", (err) => {
  if (err) return console.error(err);
  console.log("User deleted");
});
```

## 7. Mongoose Queries

### 7.1 Query Helpers

Query helpers in Mongoose allow you to chain query methods and build more complex queries. These helpers can simplify the way you write queries.

Example:

```javascript
User.find()
  .where("age")
  .gt(18)
  .exec((err, users) => {
    if (err) return console.error(err);
    console.log("Adult users:", users);
  });
```

### 7.2 Advanced Queries

You can build advanced queries using various query operators such as $and, $or, $in, and more.

Example:

```javascript
User.find(
  {
    $or: [{ age: { $lt: 18 } }, { age: { $gt: 60 } }],
  },
  (err, users) => {
    if (err) return console.error(err);
    console.log("Users younger than 18 or older than 60:", users);
  }
);
```

## 8. Population

Mongoose’s population feature allows you to reference documents from other collections. It works by replacing the specified document's ObjectId with the actual document it refers to.

Example:

```javascript
const postSchema = new mongoose.Schema({
  title: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Post = mongoose.model("Post", postSchema);

Post.find()
  .populate("author")
  .exec((err, posts) => {
    if (err) return console.error(err);
    console.log("Posts with populated author details:", posts);
  });
```

## 9. Indexes

Indexes help MongoDB search for data more efficiently. You can define indexes in your Mongoose schemas to optimize queries.

Example:

```javascript
userSchema.index({ name: 1 }); // 1 for ascending order
```

## 10. Validations

Mongoose allows you to define validation rules for your schema fields to ensure data consistency.

Example:

```javascript
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, min: 18 },
});
```

### 11. Error Handling

Error handling in Mongoose can be done using callbacks or Promises. Mongoose errors provide useful information, like validation errors or duplicate key errors.

Example:

```javascript
newUser.save((err) => {
  if (err) {
    console.error("Error occurred:", err.message);
  }
});
```

### 12. Plugins

Mongoose plugins allow you to add reusable functionality to schemas. For example, you can create a plugin to add timestamps to all your schemas.

Example:

```javascript
function timestampPlugin(schema, options) {
  schema.add({ createdAt: Date, updatedAt: Date });

  schema.pre("save", function (next) {
    this.updatedAt = Date.now();
    if (!this.createdAt) {
      this.createdAt = Date.now();
    }
    next();
  });
}

userSchema.plugin(timestampPlugin);
```

## 13. Transactions

Mongoose supports MongoDB transactions, allowing multiple operations to be executed in an atomic manner (all or nothing).

Example:

```javascript
const session = await mongoose.startSession();
session.startTransaction();
try {
  await User.create([{ name: "John", age: 25 }], { session });
  await Post.create([{ title: "Post 1", author: user._id }], { session });
  await session.commitTransaction();
} catch (error) {
  await session.abortTransaction();
  throw error;
} finally {
  session.endSession();
}
```

## 14. Aggregation Framework

The aggregation framework in Mongoose allows you to perform advanced data analysis and transformations on your MongoDB data.

Example:

```javascript
User.aggregate([
  { $match: { age: { $gt: 18 } } },
  { $group: { _id: "$age", total: { $sum: 1 } } },
]).exec((err, result) => {
  if (err) return console.error(err);
  console.log(result);
});
```

## 15. Performance Optimization

Mongoose provides various options and techniques for performance optimization, such as using indexes, lean queries, and proper schema design.

Example:

```javascript
User.find()
  .lean()
  .exec((err, users) => {
    if (err) return console.error(err);
    console.log("Lean users:", users);
  });
```

## 16. Mongoose vs. Native MongoDB Driver

Mongoose simplifies working with MongoDB by providing schemas, validation, and helpful methods. The native MongoDB driver is more low-level and flexible but requires more manual work.

## 17. References

Refer to the official [Mongoose Documentation](https://mongoosejs.com/docs/index.html) for more in-depth information and examples.
