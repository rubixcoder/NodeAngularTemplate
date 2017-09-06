var Bookshelf = require('bookshelf').DB;
var Deferred = require("promised-io/promise").Deferred;
var omapper = require('object-mapper');
var camelCaseKeys = require('camelcase-keys');

var BaseModel = Bookshelf.Model.extend({
    // By default, hide the 'id' field on toJSON() calls, so the
    // UI never sees them.
    hidden: ['id'],
});

module.exports = function (app) {
    if (!Bookshelf.model('BaseModel'))
        return Bookshelf.model('BaseModel', BaseModel);
    else
        return Bookshelf.model('BaseModel');
};