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
const { check } = require('express-validator');
const { City } = require('../models/index');
const { CRUDController } = require('./common/CRUDController');
class CitiesController extends CRUDController {
    constructor(model) {
        super(model);
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const deletedRows = yield this.model.destroy({
                    where: { id },
                    force: true
                });
                if (deletedRows < 1)
                    return res.status(500).json({
                        message: `CDUD controller: model with id:${id} can not be deleted`
                    });
                return res.sendStatus(204);
            }
            catch (error) {
                return res.status(500).json({
                    message: `CDUD controller: error with deletion model id:${id}: ${error.name}`
                });
            }
        });
    }
    putValidators() {
        return [
            check('name', 'name must be not empty!').exists().notEmpty(),
        ];
    }
    postValidators() {
        return [
            check('name', 'name must be not empty!').exists().notEmpty(),
        ];
    }
}
exports.citiesController = new CitiesController(City);
//# sourceMappingURL=citiesController.js.map