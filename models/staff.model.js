var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var DepartModel = require('../models/depart.model');

var staffSchema = new Schema({
    staffName: String,
    gender: String,
    birthday: String,
    image: String,
    salary: String,
    departID: {
        type: String,
        ref: 'depart'
    },
}, {
    collection: 'staff'
});
const StaffModel = mongoose.model('staff', staffSchema);
module.exports = StaffModel;