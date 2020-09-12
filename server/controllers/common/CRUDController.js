class CRUDController{
  constructor(model){
    this.model = model
  }


  async getAll(req, res) {
    const models = await this.model.findAll()
    const data = models.map((m) => m.dataValues)

    setTimeout(() => {
      return (res.status(200).json(data))
    }, 1000)

  }

  crudValidators() {
    return  []
  }
 
}

exports.CRUDController = CRUDController