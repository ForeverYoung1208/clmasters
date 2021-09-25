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
exports.PaginatedModel = void 0;
const sequelize_1 = require("sequelize");
class PaginatedModel extends sequelize_1.Model {
    static findAllPaginated(modelParams, paginationParams) {
        return __awaiter(this, void 0, void 0, function* () {
            let { page, pageSize } = paginationParams;
            let addOptions = {};
            if (page && pageSize) {
                page++;
                addOptions = {
                    offset: page * pageSize - pageSize,
                    limit: pageSize,
                    order: [['id', 'DESC']],
                };
            }
            const { count, rows } = yield this.findAndCountAll(Object.assign(Object.assign({}, modelParams), addOptions));
            return {
                count,
                page,
                rows,
            };
        });
    }
}
exports.PaginatedModel = PaginatedModel;
//# sourceMappingURL=PaginatedModel.js.map