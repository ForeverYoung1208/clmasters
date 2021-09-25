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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const citiesController_1 = require("../controllers/citiesController");
const accessTokenToEmail_1 = require("../middleware/accessTokenToEmail");
const checkEmailIsAdmin_1 = require("../middleware/checkEmailIsAdmin");
const router = (0, express_1.Router)();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () { return citiesController_1.citiesController.getAll(req, res); }));
router.put('/:id', accessTokenToEmail_1.accessTokenToEmail, checkEmailIsAdmin_1.checkEmailIsAdmin, citiesController_1.citiesController.putValidators(), (req, res) => __awaiter(void 0, void 0, void 0, function* () { return citiesController_1.citiesController.put(req, res); }));
router.post('/', accessTokenToEmail_1.accessTokenToEmail, checkEmailIsAdmin_1.checkEmailIsAdmin, citiesController_1.citiesController.postValidators(), (req, res) => __awaiter(void 0, void 0, void 0, function* () { return citiesController_1.citiesController.post(req, res); }));
router.delete('/:id', accessTokenToEmail_1.accessTokenToEmail, checkEmailIsAdmin_1.checkEmailIsAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () { return citiesController_1.citiesController.delete(req, res); }));
module.exports = router;
//# sourceMappingURL=cities.routes.js.map