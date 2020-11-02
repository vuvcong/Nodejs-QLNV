let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let userSchema = new Schema({
    email: String,
    username: String,
    password: String,
    role: {
        type: String,
        default: 'user'
    }
}, {
    collection: 'account',
})
UserModel = mongoose.model("account", userSchema);
module.exports = UserModel;