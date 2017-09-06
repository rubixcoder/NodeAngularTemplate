module.exports = function (app) {
    var route = app.controllers.route;
    //var mw = app.lib.middleware;
    app.get('/route/get', route.get)
    // app.post('/route/add', route.add);
    // app.post('/route/modify', mw.authenticated, route.modify);
    // app.post('/route/remove', mw.authenticated, route.remove);
};