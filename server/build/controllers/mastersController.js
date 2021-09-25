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
const { check, validationResult } = require('express-validator');
const { Master, City } = require('../models');
const { CRUDController } = require('./common/CRUDController');
const { noTimestamps } = require('../shared/services');
class MastersController extends CRUDController {
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
                    return res.status(500).json({
                        message: `masters controller: model with id:${id} can not be deleted`,
                    });
                return res.sendStatus(204);
            }
            catch (error) {
                return res.status(500).json({
                    message: `masters controller: error with deletion model id:${id}: ${error.name}`,
                });
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { page, pageSize } = req.query;
            if (page && !pageSize) {
                return res.status(400).json({
                    errors: [
                        {
                            param: 'masters',
                            msg: 'pageSize must be specified!',
                        },
                    ],
                });
            }
            if (pageSize && !page) {
                return res.status(400).json({
                    errors: [
                        {
                            param: 'masters',
                            msg: 'page must be specified!',
                        },
                    ],
                });
            }
            const { count: totalCount, page: currentPage, rows, } = yield this.model.findAllPaginated({
                order: [['id', 'ASC']],
                include: [
                    {
                        model: City,
                        as: 'city',
                    },
                ],
            }, {
                page,
                pageSize,
            });
            const data = rows.map((m) => {
                const _a = noTimestamps(m.dataValues), { city: wipedCity } = _a, master = __rest(_a, ["city"]);
                master.cityName = m.city.name;
                return master;
            });
            return res.status(200).json({ totalCount, currentPage, data });
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
                    message: 'masters controller error: not created',
                });
            newModel.dataValues.cityName = yield City.findByPk(newModel.dataValues.cityId).then(({ name }) => name);
            return res.status(201).json(noTimestamps(newModel.dataValues));
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
                result.dataValues.cityName = yield City.findByPk(result.dataValues.cityId).then(({ name }) => name);
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
    putValidators() {
        return [
            check('name', 'name must be not empty!').exists().notEmpty(),
            check('cityId', 'cityId must exist!').exists().notEmpty(),
        ];
    }
    postValidators() {
        return [
            check('name', 'name must be not empty!').exists().notEmpty(),
            check('cityId', 'cityId must exist!').exists().notEmpty(),
        ];
    }
}
exports.mastersController = new MastersController(Master);
//# sourceMappingURL=mastersController.js.map