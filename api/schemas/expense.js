// importing dependencies
const mongoose = require("mongoose");

// creating income schema to be stored in db
const expenseSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    type: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    payee: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    details: {
        type: String,
        required: true
    }
});

// exporting schema
module.exports = mongoose.model("Expense", expenseSchema);