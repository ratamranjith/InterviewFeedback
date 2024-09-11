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
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected!"))
  .catch((err) => console.log(err));
```

## Defining Schemas

```
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
});
```
