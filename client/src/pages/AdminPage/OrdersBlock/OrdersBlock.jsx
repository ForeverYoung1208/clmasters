import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { ItemsList } from '../../../components/ItemsList/ItemsList'
import { OrderEditForm } from './OrderEditForm/OrderEditForm'



export const OrdersBlock = () => {

  const orders = useSelector((store) => store.admin.orders)
  const [editOrderId, setEditOrderId] = useState()

  return (
    <div className="adminPage__itemsBlock">
      <ItemsList
        items={orders}
        fields={{
          onTime: ['on time', 'item-medium', (time) => {
            return (new Date(time)).toLocaleString('uk')
          }],
          clockId: ['clock type', 'item-narrow'],
          masterId: ['master', 'item-narrow'],
          userId: ['client', 'item-narrow'],
          comment: ['comment', 'item-wide'],
        }}
        deleteItem={(id) => { console.log(`delete order ${id}`) }}
        editItem={(id) => { setEditOrderId(id)}}
        addItem={() => { console.log('add order') }}
        editItemId={editOrderId}
        EditForm={OrderEditForm}
      />
    </div>
  )
}