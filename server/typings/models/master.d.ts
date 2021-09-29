import { Model } from "sequelize/types"
import { TPaginatedModelCtor } from "typings/paginatedModel"
import { TPreorder } from "typings/preorder"

export interface IMasterAttr {
  id: number
  cityId: number,
  rating: number,
  hourRate: number,
  name: string
  comment: string
  isActive: boolean
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}

export type TMaster = TPaginatedModelCtor<IMasterAttr> & IMasterAttr

export type TMasterCtor<T> = TPaginatedModelCtor<T>
  & {
    freeMastersForOrder(preorderData: TPreorder, excludeOrderId: number): Array<TMaster>
  }


