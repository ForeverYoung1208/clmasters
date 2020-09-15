import React from 'react'
import { useSelector } from 'react-redux'
import { ItemsList } from '../../../components/ItemsList/ItemsList'



export const OrdersBlock = () => {

  // TODO
  // const orders = useSelector((store) => store.voc.orders)
  const orders = [{ name: 'order1', id:1 }, {name:'order2', id:2}]


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