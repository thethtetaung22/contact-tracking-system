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
    if (req.body.userID) {
        history.userID = req.body.userID;
        history.save(function (err) {
            if (err) {
                return res.json(err);
            }

            return res.json({
                status: "success",
                message: "New history Added!",
                data: history
            });
        });
    } else {
        return res.json({
            status: "fail",
            message: "userID require"
        })
    }
};

exports.remove = function (req, res) {
    console.log(req.body)
    if (req?.body?.id) {
        History.findByIdAndDelete(req.body.id, function (err, data) {
            if (err) {
                return res.json({
                    status: "failed!",
                    message: "History not found or deleted!"
                });
            }
            return res.json({
                status: "success",
                message: "History deleted!"
            });
        });
    } else {
        return res.json({
            status: "failed",
            message: "History id is required!"
        });
    }
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

                if (err) {
                    return res.json(err);
                }

                return res.json({
                    status: 'success',
                    message: "History Updated Successfully",
                    data: history
                });
            });
        }
    });
};
