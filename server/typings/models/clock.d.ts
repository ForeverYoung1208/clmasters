import { Model, ModelCtor } from 'sequelize/types'
import { PaginatedModel } from 'src/models/PaginatedModel/PaginatedModel'
import { TPaginatedModelCtor } from 'typings/paginatedModel'

type IClockProperties = {
  id: number
  type: string
  repairTime: string
  comment: string
  createdAt?: Date
  updatedAt?: Date
}

export interface IClockAttr extends IClockProperties {
  dataValues?: IClockProperties
}

export type TClockCtor = TPaginatedModelCtor<IClockAttr> & {
  maxRepairTimeMsec?(): number
}

export type TClock = PaginatedModel<IClockAttr> & IClockAttr
