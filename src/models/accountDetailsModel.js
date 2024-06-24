const mongoose = require("mongoose");

const accountDetails = new mongoose.Schema({
    // firstName, lastName, accountNo, bankName
    subcriberId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    fullName: {
        type: String,
    },
    accountNo: {
        type: String,
    },
    bankName: {
        type: String,
    },
    BankAddress:{
        type:String
    },
    withdrawStatus:{
        type:String
    }
});

const userAccountDetails = mongoose.model('accountDetails', accountDetails);

module.exports = userAccountDetails;