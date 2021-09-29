import { Model } from "sequelize/types"
import { TPaginatedModelCtor } from "typings/paginatedModel"
import { TPreorder } from "typings/preorder"

export interface IOrderAttr {

}

export type TOrder = TPaginatedModelCtor<IOrderAttr> & IOrderAttr

export type TOrderCtor<T> = TPaginatedModelCtor<T>
  & {
    
  }


