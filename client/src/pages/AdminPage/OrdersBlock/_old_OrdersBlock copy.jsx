import React, { useCallback } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { ItemsList } from '../../../components/ItemsList/ItemsList'
import { myCofirm } from '../../../shared/js/myConfirm/myConfirm'
import { admindataChanged, admindataDelete } from '../../../store/actions/admin'
import { setErrorMessage } from '../../../store/actions/main'
import OrderEditForm from './OrderEditForm/OrderEditForm'

_export const OrdersBlock = () => {
  const { orders, clocks, masters, users } = useSelector((store) => store.admin)
  const [editOrderId, setEditOrderId] = useState()
  const [isAddingOrder, setIsAddingOrder] = useState(false)
  const dispatch = useDispatch()

  const deleteHandler = useCallback(
    (id) => {
      myCofirm({
        title: 'Deleting order!',
        message: 'Are you sure?',
        onAgree: () => dispatch(admindataDelete({ sectionKey: 'orders', id })),
        onCancel: () => null,
      })
    },
    [dispatch]
  )

  const saveHandler = useCallback(
    (formData) => {
      dispatch(setErrorMessage(''))
      dispatch(
        admindataChanged(
          { sectionKey: 'orders', data: formData },
          setEditOrderId
        )
      )
    },
    [dispatch]
  )

  const editHandler = useCallback((id) => {
    setEditOrderId(id)
    setIsAddingOrder(false)
  }, [])

  const addHandler = useCallback(() => {
    setEditOrderId(null)
    setIsAddingOrder(true)
  }, [])

  return (
    <div className="adminPage__itemsBlock">
      <ItemsList
        withHead={true}
        items={orders}
        fields={{
          id: ['Id', 'item-tiny'],
          onTime: [
            'On time',
            'item-medium',
            (time) => new Date(time).toLocaleString('uk'),
          ],
          clockId: [
            'Clock type',
            'item-narrow',
            (id) => clocks.find((c) => +c.id === +id).type,
          ],
          masterId: [
            'Master',
            'item-medium',
            (id) => masters.find((c) => +c.id === +id).name,
          ],
          userId: [
            'Client',
            'item-narrow',
            (id) => users.find((c) => +c.id === +id).name,
          ],
          comment: ['Comment', 'item-wide'],
        }}
        deleteItem={deleteHandler}
        saveItem={saveHandler}
        editItem={editHandler}
        addItem={addHandler}
        editItemId={editOrderId}
        isAddingItem={isAddingOrder}
        EditForm={OrderEditForm}
        AddForm={OrderEditForm}
      />
    </div>
  )
}
