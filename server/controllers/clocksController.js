import models from '../models/index.js'
import CRUDController from './common/CRUDController.js'

const { Clock } = models


class ClocksController extends CRUDController{
  constructor(model) {
    super(model)
  }
}

export default new ClocksController(Clock)