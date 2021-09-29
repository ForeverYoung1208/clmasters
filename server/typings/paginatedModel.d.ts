// https://stackoverflow.com/questions/60014874/how-to-use-typescript-with-sequelize

import { Model, ModelCtor } from 'sequelize/types'
import { PaginatedModel } from 'src/models/PaginatedModel/PaginatedModel'

export type TPaginationParams = {
  page: number | null
  pageSize: number | null
}


// define static methods of PaginatedModel
// as method of it's class
export type TPaginatedModelCtor<T> = ModelCtor<Model<T>> & {
  associate(models:Model[]):void
  findAllPaginated: (
    modelParams: {} | null,
    paginationParams: TPaginationParams
  ) => {
    count: number
    page: number | null
    rows: Model[]
  }
}
