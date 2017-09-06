//
// The main server global initialization code.
//
// This is called from server.js to "boot" the 
// server.
//
module.exports = function (app, cb, isStartSever) {
    var express = require('express');
    var path = require('path');
    //var util = require('util');
    //   var passport = require('passport');
    // var SessionStore = require('express-mysql-session');
    var i18n = require("i18n");
    var fs = require('fs');
    var sprintf = require('sprintf-js').sprintf;
    var _ = require('lodash');
    //    var XML = require('easyxml');
    var fileUpload = require('express-fileupload');
    var bodyParser = require('body-parser')
    var methodOverride = require('method-override')
    var cookieParser = require('cookie-parser')

    var pathPrefix = '/services';
    var proxy = require('path-prefix-proxy')(pathPrefix);
    app.use(pathPrefix, proxy);

    app.set('views', path.join(__dirname, 'views'));


    app.use(bodyParser.json({
        limit: '5mb'
    }));
    app.use(bodyParser.urlencoded({
        extended: true,
        limit: '5mb'
    }));
    app.use(methodOverride());
    app.use(cookieParser());


    // CORS
    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Final-Length, Offset, Content-Range, Content-Disposition');
        res.header('Access-Control-Allow-Credentials', 'true');
        res.header('Access-Control-Expose-Headers', 'Content-Disposition');
        if (req.method == 'OPTIONS') {
            res.send(200);
        } else {
            next();
        }
    });

    // can use it.
    app.use(function (req, res, next) {
        app.__ = res.__;
        next();
    });

    app.use(function (req, res, next) {
        var query = require('url').parse(req.url, true).query;
        // Summary of incoming request
        console.log('------------------------------------------------------------------------------------------');
        console.log(sprintf("| %s ( %s )", req.path, (req.user ? req.user.get('email') : 'anonymous')));
        _.forIn(query, function (v, k) {
            if (v instanceof Array)
                v = JSON.stringify(v);
            //if ( v.length > 65 ) v = v.substr(0, 62) + '...';
            // log.debug(sprintf("| - %-15s : %s", k, v));
        });
        _.forIn(req.body, function (v, k) {
            if (v instanceof Array)
                v = JSON.stringify(v);
            if (typeof v == 'string') {
                //if ( v.length > 65 ) v = v.substr(0, 62) + '...';
                if (k == 'password') v = '(blocked)';
                var lines = [];
                if (v.indexOf('{') == 0) {
                    try {
                        var json = JSON.stringify(JSON.parse(v), null, 2);
                        lines = json.split("\n");
                        v = "(json...):";
                    } catch (err) {}
                }
                //log.debug(sprintf("| - %-15s : %s", k, v));
                if (lines.length)
                    lines.forEach(function (line) {
                        //    log.debug(sprintf("|   %s", line));
                    });
            }
        });
        // log.debug('------------------------------------------------------------------------------------------');
        //log.debug(req.method.toUpperCase(), req.headers);
        next();
    });
    //  }

    //    app.use(app.router);
    app.use(fileUpload());
    var config = require('./config/config.json');
    config.bookshelf = config.dbConnection;
    if (process.env.SQL_TRACE == "1") config.bookshelf.debug = true;
    if (process.env.SQL_TRACE == "0") config.bookshelf.debug = false;

    // bring in Bookshelf!
    if (!config.bookshelf.pool)
        config.bookshelf.pool = {}
    if (!config.bookshelf.acquireConnectionTimeout)
        config.bookshelf.acquireConnectionTimeout = 11000 //11 seconds
    if (!config.bookshelf.pool.acquireTimeoutMillis)
        config.bookshelf.pool.acquireTimeoutMillis = 11000
    if (!config.bookshelf.pool.idleTimeoutMillis)
        config.bookshelf.pool.idleTimeoutMillis = 25000
    config.bookshelf.pool.afterCreate = function (conn, cbConnectionVerfied) {
        conn.query("select 1", function (err, data) {
            cbConnectionVerfied(err, conn);
        })
    }
    // NOTE: Keep this commented
    // NOTE: this block is deprecated, we have ensured that new pool recycles the connections every 30 seconds
    // config.bookshelf.pool.beforeDestroy = function(conn,cbConnectionBeDestroyed){
    //     cbConnectionBeDestroyed()
    // }
    var knex = require('knex')(config.bookshelf);

    //var Bookshelf = require('bookshelf')( knex );
    // Bookshelf.DB = Bookshelf.initialize( config.bookshelf );
    var bookshelf = require('bookshelf')(knex);
    var Bookshelf = require('bookshelf');
    Bookshelf.DB = bookshelf;
    app.set('schema', bookshelf);

    /*
     * Add the registry plugin to handle table relations definitions without
     * curcular dependencies.
     */
    Bookshelf.DB.plugin('registry');
    // THIS FIXES A BUG IN BS MODEL RESOLUTION VISA the registry plugin!!
    Bookshelf.DB.model('_unused', {});
    Bookshelf.DB.collection('_unused', {});
    /*
     * Add the visibility plugin to hide model fields on toJSON, and
     * virtuals to synth "name" on User from first_name and last_name.
     */
    Bookshelf.DB.plugin('visibility');
    Bookshelf.DB.plugin('virtuals');

    cb();
    app.use(express.static(path.join(__dirname, 'public')));

    // Page not found errors
    app.use(function (req, res, next) {
        console.error("page not found: %s", req.url);
        res.status(404).send(app.__('Page not found'));
    });

    // Server errors
    app.use(function (err, req, res, next) {
        if (err.noStackTrace) {
            console.error("handled server error: status: %d: ",
                err.status || 500, err.message);
        } else {
            console.error("handled server error: status: %d: ",
                err.status || 500, err.stack, err);
        }
        res.status(err.status >= 100 && err.status < 600 ? err.status : 500).send(err.message);
    });
    //if ((process.env.PORT || config.port) && isStartSever) {
    app.set('port', config.port);
    app.listen(app.get('port'), function () {
        console.log('---------------------------Connected---------------------------');
        console.log('Form Builder Server listening on port ' + app.get('port'));
    });
    //}


};