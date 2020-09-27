const { validationResult } = require("express-validator")

class CRUDController{
  constructor(model){
    this.model = model
  }


  async getAll(req, res) {
    const models = await this.model.findAll({
      order: [
        ['id', 'ASC']
      ]
    })
    const data = models.map((m) => {
      //TODO: DRY
      const {createdAt, updatedAt, ...noTimestamps } = m.dataValues
      return noTimestamps
    })
    return (res.status(200).json(data))
  }

  async put(req, res) { 

    const errors = validationResult(req)  
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() })
      
    let { id, ...data } = req.body
    id = req.params.id

    let modelToUpdate = await this.model.findByPk(id)
    if (!modelToUpdate) return res.status(400).json({
      message: `CDUD controller: model with id:${id} not found`
    })

    Object.assign(modelToUpdate, data)

    const result = await modelToUpdate.save()
    if (!result) return res.stats(400).json({
      message: 'CDUD controller: model not updated'
    })

    //TODO: DRY
    const {createdAt, updatedAt, ...noTimestamps } = result.dataValues
    return res.status(200).json(noTimestamps)
  }

  async post(req, res) { 
    const errors = validationResult(req)  
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() })    

    const data = req.body
    const newModel = await this.model.create(data)
    if (!newModel) return res.status(400).json({
      message: 'CDUD controller: not created'
    })

    //TODO: DRY
    const { createdAt, updatedAt, ...noTimestamps } = newModel.dataValues    
    
    return res.status(200).json(noTimestamps)
  }


  crudValidators() {
    return [
    ]
  }
 
}

exports.CRUDController = CRUDController