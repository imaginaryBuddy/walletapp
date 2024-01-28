const mongoose = require("mongoose"); 

const transactionSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users", // this is to ref the users collection, when populate is called
        required: true,
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "users",
        required: true,
    },
    // type: {
    //     type: String, 
    // },
    reference: {
        type: String, 
        required: true, 
    },
    status: {
        type: String, 
    },
}, {timestamps: true});

module.exports = mongoose.model("transactions", transactionSchema); 
