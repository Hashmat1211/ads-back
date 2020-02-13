// importing dependencies
const mongoose = require("mongoose");

// creating income schema to be stored in db
const clientSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    }
});

// exporting schema
module.exports = mongoose.model("Client", clientSchema);