import { Model, ModelCtor } from "sequelize/types";
import { PaginatedModel, TPaginatedModelCtor } from "src/models/PaginatedModel/PaginatedModel";

export interface IClockAttr {
  id:number
  type: string
  repairTime: string
  comment: string
  createdAt?: Date
  updatedAt?: Date
}
export type TClockCtor<T> = TPaginatedModelCtor<T>
  & { maxRepairTimeMsec?(): number }
