const { Model } = require('sequelize')

class PaginatedModel extends Model {
  static async findAllPaginated(modelParams, paginationParams) {

    //page is zero-based:
    let { page, pageSize } = paginationParams
    
    page++
    
    let addOptions = {}
    
    if (page && pageSize) {
      addOptions = {
        offset: page * pageSize - pageSize,
        limit: pageSize,
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

exports.PaginatedModel = PaginatedModel
