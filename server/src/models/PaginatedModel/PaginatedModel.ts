import { Model } from 'sequelize'
import { TModelParams, TPaginationParams } from 'typings/model'

export class PaginatedModel extends Model {
  static async findAllPaginated(modelParams : TModelParams, paginationParams: TPaginationParams) {

    //page is zero-based:
    let { page, pageSize } = paginationParams
    
    let addOptions = {}
    
    if (page && pageSize) {
      page++
      addOptions = {
        offset: page * pageSize - pageSize,
        limit: pageSize,
        order: [['id', 'DESC']]
      }
    }
   
    const { count, rows } = await this.findAndCountAll({ ...modelParams, ...addOptions })
    
    return {
      count,
      page,
      rows
    }
  }
}

// exports.PaginatedModel = PaginatedModel
