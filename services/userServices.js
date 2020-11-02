let UserModel = require("../models/user.model");

function signUp(email, username, password) {
    return UserModel.create({
        email,
        username,
        password
    })
}

function getAllUser() {
    return UserModel.find()
}

function getDetailUser(id) {
    return UserModel.findOne({ _id: id });
}

function updateUser(id, email, username, password) {
    let newUser = {};
    if (email) newUser.email = email;
    if (password) newUser.password = password;
    if (username) newUser.username = username;
    return UserModel.updateOne({ _id: id }, newUser)
}

function deleteUser(id) {
    return UserModel.deleteOne({ _id: id });
}

function login(email, password) {
    return UserModel.findOne({ email, password })
}

module.exports = {
    signUp,
    getAllUser,
    getDetailUser,
    updateUser,
    deleteUser,
    login
}