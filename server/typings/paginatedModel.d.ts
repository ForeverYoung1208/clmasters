// https://stackoverflow.com/questions/60014874/how-to-use-typescript-with-sequelize

import { Model, ModelCtor } from 'sequelize/types'

export type TPaginationParams = {
  page: number | null
  pageSize: number | null
}

// define static methods of PaginatedModel
// as method of it's class
export type TPaginatedModelCtor<T> = ModelCtor<Model<T>> & {
  findAllPaginated: (
    modelParams: {} | null,
    paginationParams: TPaginationParams
  ) => {
    count: number
    page: number | null
    rows: Model[]
  }
}
