/**
 * Created by Surbhi Harsh on 27/07/17.
 */
var Bookshelf = require('bookshelf').DB;
var Deferred = require("promised-io/promise").Deferred;

var BaseModel = require('../models/BaseModel')();

var Form = BaseModel.extend({
    tableName: 'form',
    hidden: [], //don't hide the id, its needed now in the UI
    actions: function () {
        return this.hasMany('Action', 'form_id', 'id')
    },
    agencyData: function () {
        return this.hasOne('AgencyData', 'form_id', 'id')
    },
    employeeData: function () {
        return this.hasOne('EmployeeData', 'form_id', 'id')
    },
    positionData: function () {
        return this.hasOne('PositionData', 'form_id', 'id')
    }
})

module.exports = function (app) {
    return Bookshelf.model('Form', Form)
};