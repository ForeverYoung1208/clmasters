import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { ItemsList } from '../../../components/ItemsList/ItemsList'
import { admindataOrderChanged } from '../../../store/actions/admin'
import OrderEditForm from './OrderEditForm/OrderEditForm'



export const OrdersBlock = () => {

  const {orders} = useSelector((store) => store.admin)
  const [editOrderId, setEditOrderId] = useState()
  const dispatch = useDispatch()

  return (
    <div className="adminPage__itemsBlock">
      <ItemsList
        withHead={true}
        items={orders}
        fields={{
          id:['Id', 'item-narrow'],
          onTime: ['On time', 'item-medium', (time) => {
            return (new Date(time)).toLocaleString('uk')
          }],
          clockId: ['Clock type', 'item-narrow'],
          masterId: ['Master', 'item-medium'],
          userId: ['Client', 'item-narrow'],
          comment: ['Comment', 'item-wide'],
        }}
        deleteItem={(id) => { console.log(`delete order ${id}`) }}
        saveItem={(formData) => { dispatch(admindataOrderChanged(formData)) }}
        editItem={(id) => { setEditOrderId(id)}}
        addItem={() => { console.log('add order') }}
        editItemId={editOrderId}
        EditForm={OrderEditForm}
      />
    </div>
  )
}