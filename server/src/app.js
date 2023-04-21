"use strict";
exports.__esModule = true;
var express_1 = require("express");
var path_1 = require("path");
var cors_1 = require("cors");
var dotenv_1 = require("dotenv");
var routes_1 = require("./routes");
// const routes = require ('./routes')
dotenv_1["default"].config();
var APP_BUILD_FOLDER = process.env.APP_BUILD_FOLDER || '../client/build';
var PORT;
switch (process.env.NODE_ENV) {
    case 'test':
    case 'development':
        PORT = process.env.APP_PORT_DEV || '5000';
        break;
    case 'production':
        PORT = process.env.APP_PORT_PROD || '5001';
        break;
    default:
        console.log('unknown NODE_ENV, app port set to 5000 ');
        PORT = '5000';
}
var app = (0, express_1["default"])();
app.use((0, cors_1["default"])());
app.use(express_1["default"].json({
    verify: function (req, res, buf) {
        req.rawBody = buf;
    }
}));
app.use('/api/auth', routes_1["default"].auth);
app.use('/api/cities', routes_1["default"].cities);
app.use('/api/clocks', routes_1["default"].clocks);
app.use('/api/preorder', routes_1["default"].preorder);
app.use('/api/orders', routes_1["default"].orders);
app.use('/api/masters', routes_1["default"].masters);
app.use('/api/users', routes_1["default"].users);
app.use('/api/payment', routes_1["default"].payment);
// SERVING STATIC IMAGES
app.use('/img/', express_1["default"].static(path_1["default"].join(__dirname, APP_BUILD_FOLDER)));
//  SERVING FRONTEND
if (process.env.NODE_ENV === 'production') {
    app.use('/', express_1["default"].static(path_1["default"].join(__dirname, APP_BUILD_FOLDER)));
    app.get('*', function (req, res) {
        res.sendFile(path_1["default"].join(__dirname, APP_BUILD_FOLDER, 'index.html'));
    });
}
if (process.env.NODE_ENV === 'test') {
    //App has been prepeared for testing
    module.exports = app;
}
else {
    app.listen(PORT, function () {
        console.log("App has been started on port " + PORT);
    });
}
