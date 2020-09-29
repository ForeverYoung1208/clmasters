const { validationResult } = require('express-validator')
const { noTimestamps } = require('../../shared/services')

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
      return noTimestamps(m.dataValues)
    })
    return (res.status(200).json(data))
  }

  async put(req, res) { 

    const errors = validationResult(req)  
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
      
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

    return res.status(200).json(noTimestamps(result.dataValues))
  }

  async post(req, res) { 
    const errors = validationResult(req)  
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })    

    const data = req.body
    const newModel = await this.model.create(data)
    if (!newModel) return res.status(400).json({
      message: 'CDUD controller: not created'
    })

    return res.status(200).json(noTimestamps(newModel.dataValues))
  }

  async delete(req, res) { 
    const { id } = req.params

    const deletedRows = await this.model.destroy({ where: {id} })

    if (deletedRows<1) return res.status(400).json({
      message: `CDUD controller: model with id:${id} can not be deleted`
    })
    return res.sendStatus(200)
    
  }


  crudValidators() {
    return [
    ]
  }
 
}

exports.CRUDController = CRUDController