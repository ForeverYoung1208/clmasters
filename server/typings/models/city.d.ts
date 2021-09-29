import { TPaginatedModel, TPaginatedModelCtor } from "typings/paginatedModel"

export interface ICityAttr {
  id: number
  name: string
  comment: string
  isActive: boolean
  createdAt?: Date
  updatedAt?: Date
}

export type TCityCtor<T> = TPaginatedModelCtor<T>
  & { maxRepairTimeMsec?(): number }

export type TCity = TPaginatedModel<ICityAttr> & ICityAttr