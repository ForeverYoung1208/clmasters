"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const sequelize_1 = require("sequelize");
const configDB_1 = __importDefault(require("../config/configDB"));
const db_1 = require("typings/db");
const basename = path_1.default.basename(__filename);
const env = process.env.NODE_ENV || 'development';
let configDB;
if ((0, db_1.isTKeyOfconfigDBs)(env)) {
    configDB = configDB_1.default[env];
}
else {
    throw new Error('No database type given in .env ("development" | "test" | "production")');
}
let sequelize = new sequelize_1.Sequelize(configDB.database, configDB.username, configDB.password, configDB.options);
const db = {};
fs_1.default.readdirSync(__dirname)
    .filter((file) => {
    return (file.indexOf('.') !== 0 &&
        file !== basename &&
        /\.(j|t)s$/.test(file.slice(-3)));
})
    .forEach((file) => {
    const model = require(path_1.default.join(__dirname, file))(sequelize);
    db[model.name] = model;
});
Object.keys(db).forEach((modelName) => {
    const t = db[modelName];
    if (t.associate) {
        t.associate(db);
    }
});
db.sequelize = sequelize;
db.Sequelize = sequelize_1.Sequelize;
module.exports = db;
//# sourceMappingURL=index.js.map