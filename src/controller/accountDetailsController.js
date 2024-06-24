const Account = require('../models/accountDetailsModel');



exports.withdrawAccountDeatils = async (req, res) => {
    try {
        const { fullName, accountNo, bankName, subcriberId,BankAddress } = req.body
        console.log(req.body);
        const accountDetails = new Account({
            subcriberId: subcriberId,
            fullName: fullName,
            accountNo: accountNo,
            bankName: bankName,
            BankAddress:BankAddress,
            withdrawStatus: 'request',
        });
        const data = await accountDetails.save();
        console.log(data);
        res.json({ message: 'payment request successfull', data: data, success: true });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.getAllAccounts = async (req, res) => {
    try {
        console.log('hit hova hn');
        const account = await Account.find();
        if (account == null) {
            return res.json({ error: 'subscriber not found' });
        }
        res.json({ message: 'account found', data: account });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.accountStatusUpdate = async (req, res) => {
    try {
        const { withdrawStatus } = req.body
        console.log(req.body);
        const id = req.params.id
        const account = await Account.findOneAndUpdate(
            { _id: id },
            { $set: { withdrawStatus: withdrawStatus } },
            { new: true }
        );
        res.send({ succes: true, msg: 'request Approved successful' });
    } catch (error) {
        console.error("Error updating name:", error);
        throw error;
    }
};
exports.getSingleAccount = async (req, res) => {
    try {
        console.log(req.params);
        const account = await Account.findById(req.params.id);
        // console.log(profile);
        if (account == null) {
            return res.json({ error: 'account not found' });
        }
        res.json({ message: 'account found', data: account });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
