import { TModelParams, TPaginationParams } from 'typings/model'

export type TModelParams = {} | null
export type TPaginationParams = {
  page: number | null
  pageSize: number | null
}

export interface MyModel extends Model {
  name: string,
  associate?: (models: any ) => void
}

// export interface IPaginatedModel extends Model {
//   // findAllPaginated(
//   //   modelParams: TModelParams,
//   //   paginationParams: TPaginationParams
//   // ): {
//   //   count: number
//   //   page: number
//   //   rows: Array<any> //Temporary ANY
//   // }
// }
