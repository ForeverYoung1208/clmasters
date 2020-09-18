import React from 'react'
import { useSelector } from 'react-redux'
import { ItemsList } from '../../../components/ItemsList/ItemsList'



export const OrdersBlock = () => {

  const orders = useSelector((store) => store.admin.orders)

  return (
    <div className="adminPage__itemsBlock">
      <ItemsList
        items={orders}
        deleteItem={ (id) => { console.log(`delete order ${id}`) }}
        updateItem={ (id) => { console.log(`update order ${id}`) }}
        addItem={() => { console.log('add order') }}

      />
    </div>
  )
}