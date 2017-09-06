var passport = require("passport");
var _ = require('lodash');
module.exports = function (app) {
    var middleware = {};

    // Used on routes that need authentication.  Usage:
    //
    //  var mw = app.lib.middleware;
    //  app.post( '/path', mw.authenticated, controller.func );
    //
    middleware.authenticated = function (req, res, next) {
        // write the code to authenticate api's
        return res.send('authenticated')
    };
    return middleware;
};