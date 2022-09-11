var mongoose = require('mongoose');
//schema
var HistorySchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    userID: {
        type: String,
        required: true
    },
    checkedIn_at: {
        type: Date,
        default: Date.now
    },
    checkedOut_at: {
        type: Date,
        default: null
    }
});
var History = module.exports = mongoose.model('histories', HistorySchema);
module.exports.get = function (callback, limit) {
    History.find(callback).limit(limit);
}