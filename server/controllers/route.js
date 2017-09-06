// var schema = require('bookshelf').DB;
// var async = require('async');
// var _ = require('lodash');

module.exports = function (app) {
    var controller = {};

    controller.get = function (req, res) {
        console.log('sdkj')
        return res.jsonp("Heelooo")
    }

    // controller.add = function (req, res, next) {
    //     console.log('hello: ', req.query)
    //     console.log('in add api: ', req.body)
    //     res.jsonp(req.body)
    //     // var uuid = req.param('uuid'); // of a shipment or a template
    //     // var type = req.param('type'); // one-of shipment or template
    //     // var data = req.body.data;

    //     // app.lib.route.add({
    //     //     uuid: uuid,
    //     //     type: type,
    //     //     data: data
    //     // }, function (err, route) {
    //     //     if (err) return next(err);
    //     //     else return res.jsonp(route);
    //     // });
    // };

    // controller.modify = function (req, res, next) {
    //     var id = req.param('id'); // of the route
    //     var type = req.param('type'); // one-of shipment or template
    //     var data = req.body.data;

    //     app.lib.route.modify({
    //         id: id,
    //         type: type,
    //         data: data
    //     }, function (err, route) {
    //         if (err) return next(err);
    //         else return res.jsonp(route);
    //     });
    // };

    // controller.remove = function (req, res, next) {
    //     var id = req.param('id'); // of the route
    //     var type = req.param('type'); // one-of shipment or template

    //     app.lib.route.remove({
    //         id: id,
    //         type: type,
    //     }, function (err) {
    //         if (err) return next(err);
    //         else return res.jsonp({});
    //     });
    // };

    return controller;
};