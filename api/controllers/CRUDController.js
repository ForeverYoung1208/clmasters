
class CRUDController{
  constructor(model){
    this.model = model
  }

  async get(id){
    const data = await this.model.findOne({where: {id}})
    return ({
      status: 200, 
      json: {
        message:'One fetched',
        data
      }  
    })  
  }

  async getAll(){
    const models = await this.model.findAll()
    const data = models.map((m) => m.dataValues )
    return ({
      status: 200, 
      json: {
        message:'All fetched',
        data
      }  
    })
  }

  async create(params) {
    let newModel = await this.model.create(params)
    if(newModel && !newModel.error){
     ({
        status: 201,
        json:{message: `Created`, data:newModel}
      })
    } else {
      return({
        status: 400,
        json:{message: `NOT created: ${newModel.error ? newModel.error: 'something wrong'}` }
      })
    }    
  }

  async delete(id) {
    let deletedCount = await this.model.destroy({where:{id}})
    if( deletedCount && deletedCount>0){
      return({
        status: 200,
        json:{message: 'this.model deleted', deletedCount}
      })
    } else {
      return({
        status: 400,
        json:{message: `this.model NOT deleted, something wrong'}` }
      })
    }    
  }

  async update({id, ...params}) {
    try {
      let count = await this.model.update(params, {where:{id}} )
      let newModel  = await this.model.findOne({where:{id}})
      if(newModel && !newModel.error && count && count>0){
        return({
          status: 201,
          json:{message: 'this.model updated', data:newModel}
        })
      } else {
        return({
          status: 400,
          json:{message: `this.model got errors while updating: ${newModel.error ? newModel.error: 'something wrong'}, updated count =${ count }` }
        })
      }    
    } catch (error) {
      return({
        status: 400,
        json:{message: `this.model got errors while updating: ${error.message} updated count =${ count }` }
      })
    }
  }  
  
}

exports.CRUDController = CRUDController;