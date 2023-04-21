import { PaginatedModel } from 'src/models/PaginatedModel/PaginatedModel'
import { TPaginatedModelCtor } from '../paginatedModel'
import { TOrder } from './order'

export interface IUserAttr {
  id?: number
  email: string
  name: string
  password?: string
  isAdmin?: boolean
  orders?: Array<TOrder>
}

export type TUserCtor = TPaginatedModelCtor<IUserAttr> & {
  register(name: string, email: string): TUser
  getByEmail(email: string): TUser
  authenticate(email: string, password: string): TUser | string
  exists(email: string): boolean
}

export type TUser = PaginatedModel<IUserAttr> & IUserAttr
