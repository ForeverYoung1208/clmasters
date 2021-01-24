const { check } = require('express-validator')
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
