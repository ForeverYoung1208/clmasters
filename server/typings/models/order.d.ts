import { PaginatedModel } from 'src/models/PaginatedModel/PaginatedModel'
import { Optional } from 'sequelize/types'
import { TPaginatedModelCtor } from '../paginatedModel'
import { IClockProperties, TClock } from './clock'
import { TUser } from './user'
import { TMaster } from './master'

type IOrderProperties = {
  id: number
  clockId: number
  masterId: number
  userId: number
  comment: string
  onTime: Date
  deletedAt?: Date
  price?: number
  calendarEventId?: string
  thumbnailUrl?: string
  photoPublicId?: string
  payedSum?: number
}


export interface IOrderAttr extends IOrderProperties {
  dataValues?:IOrderProperties
  putToGoogleCalendar?(): void
  deleteFromGoogleCalendar?(): void
  deleteFromCloudinary?(): void
  checkForPhotoCleanup?(order:TOrder): void
  isPayed?(): boolean
  payedDoneOnSum?(payedSum: string): Promise<TOrder>
  user?: TUser
  master?: TMaster
  clock?: TClock
}

type DatesFromTo = {
    dateFrom: Date 
    dateTo: Date
  }

export type TOrderCtor = TPaginatedModelCtor<IOrderAttr> & {
  getAtDate(dateStr: string): Array<TOrder>
  withinInterval({}:DatesFromTo): Array<TOrder>
}

export type TOrder = PaginatedModel<IOrderAttr> & IOrderAttr 