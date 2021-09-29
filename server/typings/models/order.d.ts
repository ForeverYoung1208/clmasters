import { type } from 'os'
import { TPaginatedModelCtor } from '../paginatedModel'
import { TClock } from './clock'

export interface IOrderAttr {
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

export interface IOrderAttrOptional {
  putToGoogleCalendar(): void
  deleteFromGoogleCalendar(): void
  deleteFromCloudinary(): void
  checkForPhotoCleanup(): void
  isPayed(): boolean
  payedDoneOnSum(payedSum: string): TOrder
}

type DatesFromTo = {
    dateFrom: Date 
    dateTo: Date
  }

export type TOrderCtor<T> = TPaginatedModelCtor<T> & {
  getAtDate(dateStr: string): Array<TOrder>
  withinInterval({}:DatesFromTo): Array<TOrder>
}

export type TOrder = TPaginatedModelCtor<IOrderAttr> & IOrderAttr 