module.exports = function (app) {

    var route = app.controllers.personnelActionForm;

    app.get('/personnelActionForm/getFormData', route.getFormData);
    app.get('/personnelActionForm/getFormById', route.getFormById);
    app.post('/personnelActionForm/saveFormData', route.saveFormData);
    app.post('/personnelActionForm/saveActionData', route.saveActionData);
    app.post('/personnelActionForm/saveAgencyData', route.saveAgencyData);
    app.post('/personnelActionForm/saveEmployeeData', route.saveEmployeeData);
    app.post('/personnelActionForm/savePositionData', route.savePositionData);
};