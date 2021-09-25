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
const mastersController_1 = require("../controllers/mastersController");
const accessTokenToEmail_1 = require("../middleware/accessTokenToEmail");
const checkEmailIsAdmin_1 = require("../middleware/checkEmailIsAdmin");
const router = (0, express_1.Router)();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () { return mastersController_1.mastersController.getAll(req, res); }));
router.put('/:id', accessTokenToEmail_1.accessTokenToEmail, checkEmailIsAdmin_1.checkEmailIsAdmin, mastersController_1.mastersController.putValidators(), (req, res) => __awaiter(void 0, void 0, void 0, function* () { return mastersController_1.mastersController.put(req, res); }));
router.post('/', accessTokenToEmail_1.accessTokenToEmail, checkEmailIsAdmin_1.checkEmailIsAdmin, mastersController_1.mastersController.postValidators(), (req, res) => __awaiter(void 0, void 0, void 0, function* () { return mastersController_1.mastersController.post(req, res); }));
router.delete('/:id', accessTokenToEmail_1.accessTokenToEmail, checkEmailIsAdmin_1.checkEmailIsAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () { return mastersController_1.mastersController.delete(req, res); }));
module.exports = router;
//# sourceMappingURL=masters.routes.js.map