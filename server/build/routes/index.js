"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const routes = {};
const basename = path_1.default.basename(__filename);
fs_1.default.readdirSync(__dirname)
    .filter((file) => {
    return (file.indexOf('.') !== 0 && file !== basename && (/\.(j|t)s$/.test(file.slice(-3))));
})
    .forEach((file) => {
    const route = require(path_1.default.join(__dirname, file));
    const name = file.split('.')[0];
    routes[name] = route;
});
exports.default = routes;
//# sourceMappingURL=index.js.map