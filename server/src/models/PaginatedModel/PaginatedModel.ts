import { Model, ModelCtor } from 'sequelize'
import { TPaginationParams } from 'typings/model'

export class PaginatedModel<T> extends Model<T> {
  static async findAllPaginated(
    modelParams: {} | null,
    paginationParams: TPaginationParams
  ) {
    let { page, pageSize } = paginationParams
    let addOptions = {}

    if (page && pageSize) {
      //page is zero-based:
      page++
      addOptions = {
        offset: page * pageSize - pageSize,
        limit: pageSize,
        order: [['id', 'DESC']],
      }
    }

    const { count, rows } = await this.findAndCountAll({
      ...modelParams,
      ...addOptions,
    })

    return {
      count,
      page,
      rows,
    }
  }
}

export type TPaginatedModelCtor<T> = ModelCtor<Model<T>>
  & {
    findAllPaginated: (
      modelParams: {} | null,
      paginationParams: TPaginationParams
    ) => number
  }


// exports.PaginatedModel = PaginatedModel
