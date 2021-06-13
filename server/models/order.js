'use strict'
const { Op } = require('sequelize')
const { PaginatedModel: Model } = require('./PaginatedModel/PaginatedModel')
const { startOfDay, endOfDay } = require('date-fns')
const orderValidators = require('./validators/orderValidators')
const {
  makeGoogleCalendarEvent,
  deleteGoogleCalendarEvent,
} = require('../shared/googleCalendarUtils')
const cloudinary = require('cloudinary').v2

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    async putToGoogleCalendar() {
      let {
        clock,
        clockId,
        user,
        userId,
        master,
        masterId,
        comment,
        onTime,
        id,
      } = this

      // in case if this method was called on instance without bound associations
      if (!clock) clock = await sequelize.models.Clock.findByPk(clockId)
      if (!user) user = await sequelize.models.User.findByPk(userId)
      if (!master) {
        master = await sequelize.models.Master.findOne({
          where: { id: masterId },
          include: [
            {
              model: sequelize.models.City,
              as: 'city',
            },
          ],
        })
      }

      const endTime = new Date(
        onTime.valueOf() + new Date(`1970-01-01T${clock.repairTime}Z`).valueOf()
      )

      const eventData = {
        summary: `Order ${id} (${clock.type} clock repair)`,
        description: `
          ${clock.type} clock repair (${clock.repairTime}),
          city: ${master.city.name}, master:${master.name},
          user: ${user.name},
          comment:${comment} 
        `,
        start: {
          dateTime: onTime,
        },
        end: {
          dateTime: endTime,
        },
      }

      const {
        data: { id: eventId },
      } = await makeGoogleCalendarEvent(eventData)
      this.calendarEventId = eventId

      //should ignore hooks to prevent infinite loop
      await this.save({ hooks: false })
    }

    async deleteFromGoogleCalendar() {
      const { calendarEventId } = this
      if (calendarEventId) {
        await deleteGoogleCalendarEvent(calendarEventId)
      }
    }

    deleteFromCloudinary() {
      const { photoPublicId } = this
      if (photoPublicId) {
        cloudinary.api.delete_resources(
          [photoPublicId],
          function (error, result) {
            if (error) {
              console.log('cloudinary error:', error)
              throw new Error(error)
            }
          }
        )
      }
    }

    checkForPhotoCleanup(order) {
      if (order._changed.has('photoPublicId') && order._previousDataValues.photoPublicId) {
        cloudinary.api.delete_resources(
          [order._previousDataValues.photoPublicId],
          function (error, result) {
            if (error) {
              console.log('cloudinary error:', error)
              throw new Error(error)
            }
          }
        )
      }
    }
    
    isPayed() {
      return ( Math.abs(this.payedSum - this.price) < 0.01)
    }

    static async getAtDate(dateStr) {
      const { startOfDay, endOfDay } = require('date-fns')
      const givenDateTime = new Date(dateStr)
      const ds = startOfDay(givenDateTime)
      const de = endOfDay(givenDateTime)
      const orders = await this.findAll({
        where: {
          onTime: {
            [Op.between]: [ds, de],
          },
        },
      })
      return orders
    }

    static async withinInterval({ dateFrom, dateTo }) {
      const Clock = sequelize.model('Clock')

      const ds = startOfDay(dateFrom)
      const de = endOfDay(dateTo)

      const orders = await this.findAll({
        where: {
          onTime: {
            [Op.between]: [ds, de],
          },
        },
        include: [
          {
            model: Clock,
            as: 'clock',
          },
        ],
      })

      return orders
    }

    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        as: 'user',
        foreignKey: { name: 'userId' },
      })
      this.belongsTo(models.Master, {
        as: 'master',
        foreignKey: { name: 'masterId' },
      })
      this.belongsTo(models.Clock, {
        as: 'clock',
        foreignKey: { name: 'clockId' },
      })
    }
  }

  Order.init(
    {
      clockId: DataTypes.INTEGER,
      masterId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      comment: DataTypes.STRING,
      onTime: DataTypes.DATE,
      deletedAt: DataTypes.DATE,
      price: DataTypes.DECIMAL,
      calendarEventId: DataTypes.STRING,
      thumbnailUrl: DataTypes.STRING,
      photoPublicId: DataTypes.STRING,
      payedSum: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: 'Order',
      paranoid: true,
      validate: {
        async isMasterFree() {
          await orderValidators.checkMasterIsFree(sequelize, this)
        },
      },
      hooks: {
        beforeUpdate: (order) => {
          order.deleteFromGoogleCalendar()
        },
        afterUpdate: (order) => {
          order.putToGoogleCalendar()
          order.checkForPhotoCleanup(order)
        },
        afterDestroy: (order) => {
          order.deleteFromGoogleCalendar()
          order.deleteFromCloudinary()
        },
        afterCreate: (order) => {
          order.putToGoogleCalendar()
        },

        // no need in 'afterBulkDestroy' hook because we are using
        // {individualHooks: true } on delete calls
      },
    }
  )

  // example of the other way to define hooks (with name). Great thing, for future knowledge.
  // Order.addHook('beforeCreate', 'checkMasterBeforeCreate', order => orderValidators.checkMasterIsFree(sequelize,order))
  // Order.addHook('beforeDestroy', 'removeGoogleCalendarEvent', order => order.deleteGoogleCalendarEvent())

  return Order
}
