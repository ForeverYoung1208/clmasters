"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { PaginatedModel: Model } = require('./PaginatedModel/PaginatedModel');
const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static register(name, email) {
            return __awaiter(this, void 0, void 0, function* () {
                if (yield User.exists(email)) {
                    return { error: 'email already taken' };
                }
                let newUser = yield User.create({ name, email, isAdmin: false });
                return newUser;
            });
        }
        static getByEmail(email) {
            return __awaiter(this, void 0, void 0, function* () {
                const user = yield User.findOne({ where: { email: email } });
                if (!user)
                    return { error: 'User email not found' };
                return user;
            });
        }
        static authenticate(email, password) {
            return __awaiter(this, void 0, void 0, function* () {
                const user = yield User.getByEmail(email);
                if (user.error)
                    return { error: user.error };
                const isAuthenticated = yield bcrypt.compare(password, user.password);
                if (isAuthenticated) {
                    return user;
                }
                else {
                    return { error: 'Wrong password!' };
                }
            });
        }
        static exists(email) {
            return __awaiter(this, void 0, void 0, function* () {
                const user = yield User.findOne({ where: { email: email } });
                return !!user;
            });
        }
        static associate(models) {
            User.orders = this.hasMany(models.Order, {
                foreignKey: {
                    as: 'orders',
                    name: 'userId',
                },
            });
        }
    }
    User.init({
        email: DataTypes.STRING,
        name: DataTypes.STRING,
        password: DataTypes.STRING,
        isAdmin: DataTypes.BOOLEAN,
    }, {
        sequelize,
        modelName: 'User',
    });
    const lowercaseEmail = (user) => {
        user.email = user.email.toLowerCase();
        return user;
    };
    User.addHook('beforeSave', 'lowercaseEmail', lowercaseEmail);
    User.addHook('beforeUpdate', 'lowercaseEmail', lowercaseEmail);
    return User;
};
//# sourceMappingURL=user.js.map