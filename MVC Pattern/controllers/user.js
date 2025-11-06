const User = require('../models/user');

// Isolated FUNCTIONS
const handleGetAllUser = async (req, res) => {
    const allDbUsers = await User.find({});
    res.json(allDbUsers)
};

const handleGetUserById = async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ status: 'PEnding' })
    return res.json(user)
};

const handleUpdateUserById = async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, { email: "Changed" })
    return res.json({ status: 'Success' })
};
const handleDeleteUserById = async (req, res) => {
    await User.findByIdAndDelete(req.params.id)
    return res.json({ status: 'Success' })
};
const handleCreateNewUser = async (req, res) => {
    const body = req.body;

    if (!body || !body.firstName || !body.email) {
        return res.status(400).json({ msg: 'ALL feild req..' })
    }
    // Creating a user with help of modal 
    const result = await User.create({
        firstName: body.firstName,
        email: body.email,
    });

    // console.log(result);
    return res.status(201).json({ msg: "success", id: result._id })

};

module.exports = {
    handleGetAllUser,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateNewUser,
};