import { Model } from 'sequelize'
import { TPaginationParams } from 'typings/paginatedModel'

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

