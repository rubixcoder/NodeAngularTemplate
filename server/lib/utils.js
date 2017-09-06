var camelCaseKeys = require("camelcase-keys");
var snakeCaseKeys = require("snakecase-keys");

module.exports = function (app) {
    var utils = {};

    // Used on routes that need authentication.  Usage:
    //
    //  var mw = app.lib.middleware;
    //  app.post( '/path', mw.authenticated, controller.func );
    //
    utils.toCamelCaseObj = function (obj) {
        return camelCaseKeys(obj, {
            deep: true
        });
    };

    utils.toCamelCaseArr = function (arr) {
        var tempArr = [];
        arr.forEach(function (item) {
            tempArr.push(camelCaseKeys(item, {
                deep: true
            }));
        })
        return tempArr;
    }

    utils.toSnakeCaseObj = function (obj) {
        return snakeCaseKeys(obj, {
            deep: true
        });
    }

    utils.toSnakeCaseArr = function (arr) {
        var tempArr = [];
        arr.forEach(function (item) {
            tempArr.push(snakeCaseKeys(item, {
                deep: true
            }));
        })
    }
    return utils;
};