// importing dependencies
const mongoose = require("mongoose");

// creating income schema to be stored in db
const projectSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    amount: {
        type: Number,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    client: {
        type: String,
        required: true
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Developer",
        required: true
    },
    developer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Developer",
        required: true
    },
    hours: {
        type: Number,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
});

// exporting schema
module.exports = mongoose.model("Income", projectSchema);