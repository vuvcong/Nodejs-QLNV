var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var StaffModel = require('../models/staff.model');

var recordSchema = new Schema({
    recordType: String,
    recordDate: String,
    staffID: {
        type: String,
        ref: 'staff'
    }
}, {
    collection: 'record'
});
const RecordModel = mongoose.model('record', recordSchema);
module.exports = RecordModel;