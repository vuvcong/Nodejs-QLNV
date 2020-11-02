const mongoose = require('mongoose');

let connectDB = () => {
    mongoose.connect('mongodb://localhost/ps11322', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function() {
        console.log("connection susscessfully");
    });
    return mongoose
}

module.exports = connectDB;