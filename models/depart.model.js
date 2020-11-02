var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var departSchema = new Schema({
    departID: String,
    departName: String,
}, {
    collection: 'depart'
});
const DepartModel = mongoose.model('depart', departSchema);
module.exports = DepartModel;