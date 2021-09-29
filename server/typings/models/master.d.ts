import { Model } from 'sequelize/types'
import { PaginatedModel } from 'src/models/PaginatedModel/PaginatedModel'
import { TPaginatedModelCtor } from 'typings/paginatedModel'
import { TPreorder } from 'typings/preorder'

export interface IMasterAttr {
  id: number
  cityId: number
  rating: number
  hourRate: number
  name: string
  comment: string
  isActive: boolean
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}

export type TMasterCtor = TPaginatedModelCtor<IMasterAttr> & {
  freeMastersForOrder(
    preorderData: TPreorder,
    excludeOrderId: number
  ): Array<TMaster>
}

export type TMaster = PaginatedModel<IMasterAttr> & IMasterAttr
