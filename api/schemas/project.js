// importing dependencies
const mongoose = require("mongoose");

// creating income schema to be stored in db
const projectSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    status: {
        type: String
    },
    amount: {
        type: String
    },
    details: {
        type: String
    },
    date: {
        type: Date
    }
});

// exporting schema
module.exports = mongoose.model("Project", projectSchema);