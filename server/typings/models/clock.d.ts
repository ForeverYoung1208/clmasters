import { PaginatedModel } from "src/models/PaginatedModel/PaginatedModel";

export interface IClockAttr {
  id:number
  type: string
  repairTime: string
  comment: string
  createdAt?: Date
  updatedAt?: Date
  maxRepairTimeMsec?():string
}