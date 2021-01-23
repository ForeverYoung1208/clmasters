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
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() })
      
    let { id, ...data } = req.body
    id = req.params.id

    let modelToUpdate = await this.model.findByPk(id)
    if (!modelToUpdate) return res.status(400).json({
      message: `Model with id:${id} not found`
    })

    Object.assign(modelToUpdate, data)

    try {
      var result = await modelToUpdate.save()
    } catch ({errors}) {
      return res.status(400).json({ errors }) 
    }

    if (!result) return res.stats(500).json({
      message: 'CDUD controller error: model not updated'
    })

    return res.status(200).json(noTimestamps(result.dataValues))
  }


  async post(req, res) { 
    const errors = validationResult(req)  
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() })    

    const data = req.body
    try {
      var newModel = await this.model.create(data)
    } catch ({errors}) {
      return res.status(400).json({ errors })
    }

    if (!newModel) return res.status(500).json({
      message: 'CDUD controller error: not created'
    })

    return res.status(201).json(noTimestamps(newModel.dataValues))
  }


  async delete(req, res) { 
    const { id } = req.params

    const deletedRows = await this.model.destroy({ where: {id} })

    if (deletedRows<1) return res.status(500).json({
      message: `CDUD controller: model with id:${id} can not be deleted`
    })
    return res.sendStatus(204)
    
  }
 
}

exports.CRUDController = CRUDController