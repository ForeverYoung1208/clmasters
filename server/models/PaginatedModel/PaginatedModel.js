const { Model } = require('sequelize')

class PaginatedModel extends Model {
  static async findAllPaginated(modelParams, paginationParams) {
    const { page = 1, pageSize = 10, search } = paginationParams

    let options = {
      offset: page * pageSize - pageSize,
      limit: pageSize,
    }

    if (search && Object.keys(search).length) {
      options = { options, ...search }
    }
    
    const { count, rows } = await this.findAndCountAll({ ...modelParams, ...options })
    
    return {
      totalCount: count,
      currentPage: page,
      rows
    }
  }
}

exports.PaginatedModel = PaginatedModel
