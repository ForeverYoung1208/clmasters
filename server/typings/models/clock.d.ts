import { Model, ModelCtor } from 'sequelize/types'
import { PaginatedModel } from 'src/models/PaginatedModel/PaginatedModel'
import { TPaginatedModelCtor } from 'typings/paginatedModel'

export interface IClockAttr {
  id: number
  type: string
  repairTime: string
  comment: string
  createdAt?: Date
  updatedAt?: Date
}
export type TClockCtor = TPaginatedModelCtor<IClockAttr> & {
  maxRepairTimeMsec?(): number
}

export type TClock = PaginatedModel<IClockAttr> & IClockAttr
