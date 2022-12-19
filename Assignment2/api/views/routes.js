
module.exports = function(app){
    var controller = require('../controllers/controller');

    app.route('/rest/v1/users')
        .get(controller.get_users);

    app.route('/rest/v1/products')
        .get(controller.get_products);

    app.route('/rest/v1/users/:user_id')
        .get(controller.get_user);

    app.route('/rest/v1/users/:user_id/cart')
        .post(controller.put_to_cart)
        .get(controller.get_cart);
};