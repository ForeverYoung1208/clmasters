import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { ItemsList } from '../../../components/ItemsList/ItemsList'
import { admindataChanged, admindataDelete } from '../../../store/actions/admin'
import OrderEditForm from './OrderEditForm/OrderEditForm'



export const OrdersBlock = () => {

  const {orders, clocks, masters, users} = useSelector((store) => store.admin)
  const [editOrderId, setEditOrderId] = useState()
  const [isAddingOrder, setIsAddingOrder] = useState(false)
  const dispatch = useDispatch()

  return (
    <div className="adminPage__itemsBlock">
      <ItemsList
        withHead={true}
        items={orders}
        fields={{
          id: ['Id', 'item-tiny'],
          onTime: ['On time', 'item-medium',
            (time) => (new Date(time)).toLocaleString('uk')
          ],
          clockId: ['Clock type', 'item-narrow',
            (id) => (clocks.find((c) => +c.id === +id).type)
          ],
          masterId: ['Master', 'item-medium',
            (id) => (masters.find((c) => +c.id === +id).name)
          ],
          userId: ['Client', 'item-narrow',
            (id) => (users.find((c) => +c.id === +id).name)
          ],
          comment: ['Comment', 'item-wide'],
        }}
        deleteItem={(id) => {
          window.confirm('Are you sure?') &&
            dispatch(admindataDelete({ sectionKey: 'orders', id }))
        }}
        saveItem={(formData) =>
          dispatch(admindataChanged(
            { sectionKey: 'orders', data: formData }, setEditOrderId))}
        editItem={(id) => {
          setEditOrderId(id)
          setIsAddingOrder(false)
        }}
        addItem={() => {
          setEditOrderId(null)
          setIsAddingOrder(true)
        }}
        editItemId={editOrderId}
        isAddingItem={isAddingOrder}
        EditForm={OrderEditForm}
        AddForm={OrderEditForm}
      />
    </div>
  )
}