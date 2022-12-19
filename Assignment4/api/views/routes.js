module.exports = function(app){
    var controller = require('../controllers/controller');

    app.route('/login')
        .post(controller.authentication)

    app.route('/inbound/sms')
        .post(controller.verifyToken, controller.inbound);

    app.route('/outbound/sms')
        .post(controller.createLimiter, controller.verifyToken,controller.outbound);

};