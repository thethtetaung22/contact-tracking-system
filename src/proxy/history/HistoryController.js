const History = require('./HistoryModel');
const { v4 } = require('uuid');
exports.index = (req, res) => {
    History.get((err, histories) => {
        if (err)
            res.json({
                status: "error",
                message: err
            });
        res.json({
            status: "success",
            message: "Got users Successfully!",
            data: histories
        });
    });
};

exports.add = function (req, res) {
    var history = new History();
    history.id = v4();
    history.userID = req.body.userID;
    history.save(function (err) {
        if (err)
            res.json(err);
        res.json({
            status: "success",
            message: "New history Added!",
            data: history
        });
    });
};

exports.update = function (req, res) {
    History.find({ id: req.body.id }, function (err, data) {
        if (err) {
            res.send(err);
        }
        if (data) {
            const history = data[0];
            history.checkedOut_at = Date.now();
            history.save(function (err) {
                if (err)
                    res.json(err)
                res.json({
                    status: 'success',
                    message: "History Updated Successfully",
                    data: history
                });
            });
        }
    });
};