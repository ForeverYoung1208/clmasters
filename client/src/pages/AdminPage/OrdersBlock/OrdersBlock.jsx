import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SubmissionError } from 'redux-form'

import { ItemsList } from '../../../components/ItemsList/ItemsList'
import { apiDeleteEntity, apiPostEntity, apiPutEntity } from '../../../shared/js/api'
import { deleteAdmindataOk, postAdmindataOk, apiAdmindataError } from '../../../store/actions/admin'
import { loaderHide, loaderShow } from '../../../store/actions/main'
import OrderEditForm from './OrderEditForm/OrderEditForm'



export const OrdersBlock = () => {

  const {orders, clocks, masters, users} = useSelector((store) => store.admin)
  const [editOrderId, setEditOrderId] = useState()
  const [isAddingOrder, setIsAddingOrder] = useState(false)
  const dispatch = useDispatch()

  const handleSaveItem = async (formData) => {
    const sectionKey = 'orders'
    let res
    
    dispatch(loaderShow('admindata'))
    formData.id
      ? res = await apiPutEntity({ sectionKey, data: formData }) // id is present - updating
      : res = await apiPostEntity({ sectionKey, data: formData }) //id isn't present - creating
    dispatch(loaderHide('admindata'))
    
    const resData = await res.json()
    if (res.status === 200) { 
      dispatch(postAdmindataOk({ sectionKey, data: resData }))
    } else {
      console.log('[resData]', resData)
      const submissionErrors = resData.errors.reduce((acc, currErr) => {
        return {
          ...acc,
          [currErr.param]:'must exist'
        }
      }, {})
        throw new SubmissionError(submissionErrors)
    }
    setEditOrderId(null)
  }

  const handleDeleteItem = async (id) => {
    if (!window.confirm('Are you sure?')) return
    const sectionKey = 'orders'

    dispatch(loaderShow('admindata'))
    const res = await apiDeleteEntity({ sectionKey, id })
    dispatch(loaderHide('admindata'))

    res.status === 200
      ? dispatch(deleteAdmindataOk({ sectionKey, id }))
      : dispatch(apiAdmindataError({message: `Item id ${id} can't be deleted`}))
  }

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
        deleteItem={handleDeleteItem}
        saveItem={handleSaveItem}
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