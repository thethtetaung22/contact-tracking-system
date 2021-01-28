const User = require('./UserModel');
const { v4 } = require('uuid');
exports.index = (req, res) => {
    User.get((err, users) => {
        if (err)
            res.json({
                status: "error",
                message: err
            });
        res.json({
            status: "success",
            message: "Got users Successfully!",
            data: users
        });
    });
};

exports.add = function (req, res) {
    var user = new User();
    user.id = v4();
    user.name = req.body.name;
    user.phone = req.body.phone;
    user.nrc = req.body.nrc;
    user.address = req.body.address;
    user.save(function (err) {
        if (err)
            res.json(err);
        res.json({
            status: "success",
            message: "New User Added!",
            data: user
        });
    });
};

exports.findById = function (req, res) {
    User.find({ id: req.params.id }, function (err, data) {
        if (err) {
            res.send(err);
        }
        res.json({
            status: 'success',
            message: "History Updated Successfully",
            data: data
        });
    });
};
