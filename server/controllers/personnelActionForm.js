var schema = require('bookshelf').DB;
var async = require('async');
var _ = require('lodash');
var moment = require('moment');

module.exports = function (app) {
    var utils = app.lib.utils;
    var controller = {};

    /**
     * This function gets all forms data
     * @param {req} input any number
     * @param {res} input any number
     * @returns {results} array of all form objects
     */
    controller.getFormData = function (req, res) {
        console.log('In GET Form Data', req.query)
        if (parseInt(req.query.pageSize) > 0) {
            console.log('returning limit records')
            schema.model('Form').forge().query(function (qb) {
                qb.debug(false)
                    .limit(parseInt(req.query.pageSize))
                    .offset(parseInt(req.query.page))
            }).fetchAll({
                pageSize: req.query.pageSize, //Defaults to 10 if not specified
                page: req.query.page, //Defaults to 1 if not specified
                withRelated: ['actions', 'agencyData', 'employeeData', 'positionData']
            }).then(function (results) {
                if (results == null || results == undefined) {
                    results = [];
                }
                results = utils.toCamelCaseArr(results.toJSON());
                return res.jsonp(results);
            }).catch(function (err) {
                return res.sendStatus(500).send("Internal Server Error: ", err.message)
            })
        } else {
            schema.model('Form').forge().fetchAll({
                withRelated: ['actions', 'agencyData', 'employeeData', 'positionData']
            }).then(function (results) {
                if (results == null || results == undefined) {
                    results = [];
                }
                results = utils.toCamelCaseArr(results.toJSON());
                return res.jsonp(results);
            }).catch(function (err) {
                return res.sendStatus(500).json({
                    msg: err.message
                })
            })
        }
    }

    controller.getFormById = function (req, res) {
        if (req.query.id) {
            schema.model('Form').forge().where({
                id: req.query.id
            }).fetch({
                withRelated: ['actions', 'agencyData', 'employeeData', 'positionData']
            }).then(function (result) {
                if (result == null) {
                    result = {}
                }
                return res.jsonp(utils.toCamelCaseObj(result.toJSON()));
            }).catch(function (err) {
                return res.sendStatus(500).send("Internal Server Error: ", err.message)
            })
        } else {
            return res.jsonp("No Id passed!!")
        }
    }

    controller.saveFormData = function (req, res) {
        var reqPostObj = utils.toSnakeCaseObj(req.body);
        reqPostObj.date_of_birth = moment(reqPostObj.date_of_birth).unix();
        reqPostObj.effective_date = moment(reqPostObj.effective_date).unix();
        reqPostObj.created_date = moment().unix()
        schema.model('Form').forge().save(reqPostObj).then(function (results) {
            if (results == null) {
                results = {}
            }
            results = utils.toCamelCaseObj(results.toJSON());
            return res.jsonp(results);
        }).catch(function (err) {
            return res.sendStatus(500).send("Internal Server Error: ", err.message)
        })
    }

    controller.saveActionData = function (req, res) {
        var reqPostObj = utils.toSnakeCaseObj(req.body);
        if (reqPostObj) {
            schema.model('Action').forge().save(reqPostObj).then(function (result) {
                console.log('results: ', result)
                if (result == null) {
                    result = {}
                }
                return res.jsonp(utils.toCamelCaseObj(result))
            }).catch(function (err) {
                console.log('err: ', err)
                return res.sendStatus(500).jsonp({
                    msg: err.message
                })
            })
        } else {
            console.log('No body to save')
            return res.sendStatus(404).json({
                msg: "No Body found to save!!"
            })
        }
    }

    controller.saveAgencyData = function (req, res) {
        var reqPostObj = utils.toSnakeCaseObj(req.body);
        if (reqPostObj) {
            schema.model('AgencyData').forge().save(reqPostObj).then(function (result) {
                if (result == null) {
                    result = {}
                }
                return res.jsonp(utils.toCamelCaseObj(result))
            }).catch(function (err) {
                return res.sendStatus(500).json({
                    msg: err.message
                })
            })
        } else {
            return res.sendStatus(404).json({
                msg: "No Body found to save!!"
            })
        }
    }

    controller.saveEmployeeData = function (req, res) {
        var reqPostObj = utils.toSnakeCaseObj(req.body);
        if (reqPostObj) {
            schema.model('EmployeeData').forge().save(reqPostObj).then(function (result) {
                if (result == null) {
                    result = {}
                }
                return res.jsonp(utils.toCamelCaseObj(result))
            }).catch(function (err) {
                return res.sendStatus(500).json({
                    msg: err.message
                })
            })
        } else {
            return res.sendStatus(404).json({
                msg: "No Body found to save!!"
            })
        }
    }

    controller.savePositionData = function (req, res) {
        var reqPostObj = utils.toSnakeCaseObj(req.body);
        if (reqPostObj) {
            schema.model('PositionData').forge().save(reqPostObj).then(function (result) {
                if (result == null) {
                    result = {}
                }
                return res.jsonp(utils.toCamelCaseObj(result))
            }).catch(function (err) {
                return res.sendStatus(500).json({
                    msg: err.message
                })
            })
        } else {
            return res.sendStatus(404).json({
                msg: "No Body found to save!!"
            })
        }
    }
    return controller;
};