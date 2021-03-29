const { check, validationResult } = require('express-validator')
const { Master, City } = require('../models')
const { CRUDController } = require('./common/CRUDController')
const { noTimestamps } = require('../shared/services')

class MastersController extends CRUDController {
  constructor(model) {
    super(model)
  }

  // real delete !!!
  async delete(req, res) {
    const { id } = req.params

    try {
      const deletedRows = await this.model.destroy({
        where: { id },
        force: true, // real deletion - to check FK constraints!!!
      })

      if (deletedRows < 1)
        return res.status(500).json({
          message: `masters controller: model with id:${id} can not be deleted`,
        })
      return res.sendStatus(204)
    } catch (error) {
      return res.status(500).json({
        message: `masters controller: error with deletion model id:${id}: ${error.name}`,
      })
    }
  }

  // overrides parent CRUDcontroller method
  async getAll(req, res) {
    const masters = await this.model.findAll({
      order: [['id', 'ASC']],
      include: [
        {
          model: City,
          as: 'city',
        },
      ],
    })

    const data = masters.map((m) => {
      const { city, ...master } = noTimestamps(m.dataValues) // without city information
      master.cityName = m.city.name //only cityName
      return master
    })
    return res.status(200).json(data)
  }

  // overrides parent CRUDcontroller method
  async post(req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() })

    const data = req.body
    try {
      var newModel = await this.model.create(data)
    } catch ({ errors }) {
      return res.status(400).json({ errors })
    }

    if (!newModel)
      return res.status(500).json({
        message: 'masters controller error: not created',
      })

    newModel.dataValues.cityName = await City.findByPk(
      newModel.dataValues.cityId
    ).then(({ name }) => name)

    return res.status(201).json(noTimestamps(newModel.dataValues))
  }

  // overrides parent CRUDcontroller method
  async put(req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() })

    let { id, ...data } = req.body
    id = req.params.id

    let modelToUpdate = await this.model.findByPk(id)
    if (!modelToUpdate)
      return res.status(400).json({
        message: `Model with id:${id} not found`,
      })

    Object.assign(modelToUpdate, data)

    try {
      var result = await modelToUpdate.save()
      result.dataValues.cityName = await City.findByPk(
        result.dataValues.cityId
      ).then(({ name }) => name)
    } catch ({ errors }) {
      return res.status(400).json({ errors })
    }

    if (!result)
      return res.stats(500).json({
        message: 'CDUD controller error: model not updated',
      })

    return res.status(200).json(noTimestamps(result.dataValues))
  }

  putValidators() {
    return [
      check('name', 'name must be not empty!').exists().notEmpty(),
      check('cityId', 'cityId must exist!').exists().notEmpty(),
    ]
  }

  postValidators() {
    return [
      check('name', 'name must be not empty!').exists().notEmpty(),
      check('cityId', 'cityId must exist!').exists().notEmpty(),
    ]
  }
}

exports.mastersController = new MastersController(Master)
