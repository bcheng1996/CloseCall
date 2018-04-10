var mongoose = require('mongoose');

var crashSchema = new mongoose.Schema({
    name: {
        type: String
    },
    long: {
        type: String
    },
    lat: {
        type: String
    },
    time: {
        type: String
    },
});

var Crash = mongoose.model('Crash', crashSchema);
module.exports = Crash;
