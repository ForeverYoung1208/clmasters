import React from 'react'
import { useSelector } from 'react-redux'
import { ItemsList } from '../../../components/ItemsList/ItemsList'



export const OrdersBlock = () => {

  const orders = useSelector((store) => store.admin.orders)

  return (
    <div className="adminPage__itemsBlock">
      <ItemsList
        items={orders}
        fields={{
          onTime: ['on time', 'item-medium', (time) => (time.toLocaleString())],
          clockId:['clock type','item-narrow'],
          masterId:['master','item-narrow'],
          userId:['client','item-narrow'],
          comment: ['comment','item-wide'],
        }}        
        deleteItem={ (id) => { console.log(`delete order ${id}`) }}
        editItem={ (id) => { console.log(`editItem order ${id}`) }}
        addItem={() => { console.log('add order') }}

      />
    </div>
  )
}