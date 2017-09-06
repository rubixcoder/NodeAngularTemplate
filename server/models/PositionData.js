/**
 * Created by Surbhi Harsh on 28/07/17.
 */
var Bookshelf = require('bookshelf').DB;
var Deferred = require("promised-io/promise").Deferred;

var BaseModel = require('../models/BaseModel')();

var PositionData = BaseModel.extend({
    tableName: 'position_data',
    hidden: []
})

module.exports = function (app) {
    return Bookshelf.model('PositionData', PositionData)
};