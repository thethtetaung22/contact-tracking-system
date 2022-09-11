let router = require('express').Router();
var userController = require('./user/UserController');
var historyController = require('./history/HistoryController');

router.get('/', function (req, res) {
    res.json({
        status: 'API Works',
        message: 'Welcome to FirstRest API'
    });
});

router.route('/user/:id')
    .get(userController.findById);

router.route('/user')
    .get(userController.index)
    .post(userController.add);

// router.route()

router.route('/history')
    .get(historyController.index)
    .delete(historyController.remove)
    .post(historyController.add)
    .patch(historyController.update);

module.exports = router;
