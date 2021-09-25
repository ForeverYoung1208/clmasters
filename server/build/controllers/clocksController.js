"use strict";
const { Clock } = require('../models/index');
const { CRUDController } = require('./common/CRUDController');
class ClocksController extends CRUDController {
    constructor(model) {
        super(model);
    }
}
exports.clocksController = new ClocksController(Clock);
//# sourceMappingURL=clocksController.js.map