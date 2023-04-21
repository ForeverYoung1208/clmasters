import { PaginatedModel } from 'src/models/PaginatedModel/PaginatedModel'
import { TPaginatedModel, TPaginatedModelCtor } from 'typings/paginatedModel'

export interface ICityAttr {
  id: number
  name: string
  comment: string
  isActive: boolean
  createdAt?: Date
  updatedAt?: Date
}

export type TCityCtor = TPaginatedModelCtor<ICityAttr> & {
  maxRepairTimeMsec?(): number
}

export type TCity = PaginatedModel<ICityAttr> & ICityAttr
