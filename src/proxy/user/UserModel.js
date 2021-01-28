var mongoose = require('mongoose');
//schema
var UserSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    nrc: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});
var User = module.exports = mongoose.model('users', UserSchema);
module.exports.get = function (callback, limit) {
   User.find(callback).limit(limit); 
}