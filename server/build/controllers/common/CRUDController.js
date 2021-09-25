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
const { validationResult } = require('express-validator');
const { noTimestamps } = require('../../shared/services');
class CRUDController {
    constructor(model) {
        this.model = model;
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { page, pageSize } = req.query;
            if (page && !pageSize) {
                res.status(400).json({
                    errors: [
                        {
                            param: 'CRUD controller',
                            msg: 'pageSize must be specified!',
                        },
                    ],
                });
            }
            if (pageSize && !page) {
                return res.status(400).json({
                    errors: [
                        {
                            param: 'CRUD controller',
                            msg: 'page must be specified!',
                        },
                    ],
                });
            }
            const { count: totalCount, page: currentPage, rows, } = yield this.model.findAllPaginated({
                order: [['id', 'ASC']],
            }, {
                page,
                pageSize,
            });
            const data = rows.map((m) => {
                return noTimestamps(m.dataValues);
            });
            return res.status(200).json({ totalCount, currentPage, data });
        });
    }
    put(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = validationResult(req);
            if (!errors.isEmpty())
                return res.status(422).json({ errors: errors.array() });
            let _a = req.body, { id } = _a, data = __rest(_a, ["id"]);
            id = req.params.id;
            let modelToUpdate = yield this.model.findByPk(id);
            if (!modelToUpdate)
                return res.status(400).json({
                    message: `Model with id:${id} not found`,
                });
            Object.assign(modelToUpdate, data);
            try {
                var result = yield modelToUpdate.save();
            }
            catch ({ errors }) {
                return res.status(400).json({ errors });
            }
            if (!result)
                return res.stats(500).json({
                    message: 'CDUD controller error: model not updated',
                });
            return res.status(200).json(noTimestamps(result.dataValues));
        });
    }
    post(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = validationResult(req);
            if (!errors.isEmpty())
                return res.status(422).json({ errors: errors.array() });
            const data = req.body;
            try {
                var newModel = yield this.model.create(data);
            }
            catch ({ errors }) {
                return res.status(400).json({ errors });
            }
            if (!newModel)
                return res.status(500).json({
                    message: 'CDUD controller error: not created',
                });
            return res.status(201).json(noTimestamps(newModel.dataValues));
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const deletedRows = yield this.model.destroy({ where: { id }, individualHooks: true });
            if (deletedRows < 1)
                return res.status(500).json({
                    message: `CDUD controller: model with id:${id} can not be deleted`,
                });
            return res.sendStatus(204);
        });
    }
}
exports.CRUDController = CRUDController;
//# sourceMappingURL=CRUDController.js.map