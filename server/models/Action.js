/**
 * Created by Surbhi Harsh on 27/07/17.
 */
var Bookshelf = require('bookshelf').DB;
var Deferred = require("promised-io/promise").Deferred;

var BaseModel = require('../models/BaseModel')();

var Action = BaseModel.extend({
    tableName: 'action',
    hidden: []
})

module.exports = function (app) {
    return Bookshelf.model('Action', Action)
};