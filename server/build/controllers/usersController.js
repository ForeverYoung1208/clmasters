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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
const { check } = require('express-validator');
const { User } = require('../models');
const { noTimestamps } = require('../shared/services');
const { CRUDController } = require('./common/CRUDController');
class UsersController extends CRUDController {
    constructor(model) {
        super(model);
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const deletedRows = yield this.model.destroy({
                    where: { id },
                    force: true,
                });
                if (deletedRows < 1)
                    return res.status(400).json({
                        message: `CDUD controller: model with id:${id} can not be deleted`,
                    });
                return res.sendStatus(204);
            }
            catch (error) {
                return res.status(400).json({
                    message: `CDUD controller: error with deletion model id:${id}: ${error.name}`,
                });
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { page, pageSize } = req.query;
            if (page && !pageSize) {
                res.status(400).json({
                    errors: [
                        {
                            param: 'users',
                            msg: 'pageSize must be specified!',
                        },
                    ],
                });
            }
            if (pageSize && !page) {
                return res.status(400).json({
                    errors: [
                        {
                            param: 'users',
                            msg: 'page must be specified!',
                        },
                    ],
                });
            }
            const { count: totalCount, page: currentPage, rows, } = yield this.model.findAllPaginated({ order: [['id', 'ASC']] }, {
                page,
                pageSize,
            });
            const data = rows.map((m) => {
                const _a = m.dataValues, { wipedPassword } = _a, userDataNoPassword = __rest(_a, ["wipedPassword"]);
                return noTimestamps(userDataNoPassword);
            });
            return res.status(200).json({ totalCount, currentPage, data });
        });
    }
    putValidators() {
        return [
            check('name', 'name must be not empty!').exists().notEmpty(),
            check('email', 'Enter correct Email address.').isEmail(),
            check('password', 'Must be longer than 2 chars')
                .if((value, { req }) => req.body.isAdmin)
                .isLength({ min: 2 }),
        ];
    }
    postValidators() {
        return [
            check('name', 'name must be not empty!').exists().notEmpty(),
            check('email', 'Enter correct Email address.').isEmail(),
            check('password', 'Must be longer than 2 chars')
                .if((value, { req }) => req.body.isAdmin)
                .isLength({ min: 2 }),
        ];
    }
}
exports.usersController = new UsersController(User);
//# sourceMappingURL=usersController.js.map