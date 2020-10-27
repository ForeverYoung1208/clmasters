import React, { useCallback } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ItemsList } from '../../../components/ItemsList/ItemsList'
import { myCofirm } from '../../../shared/js/myConfirm/myConfirm'
import { admindataChanged, admindataDelete } from '../../../store/actions/admin'
import MasterEditForm from './MasterEditForm/MasterEditForm'

export const MastersBlock = () => {

  const { masters, cities } = useSelector((store) => store.admin)

  const [editMasterId, setEditMasterId] = useState()
  const [isAddingMaster, setIsAddingMaster] = useState(false)
  const dispatch = useDispatch()

  const deleteHandler = useCallback((id) => {
    myCofirm({
      title: 'Deleting master!',
      message: 'Are you sure?',
      onAgree: () => dispatch(admindataDelete({ sectionKey: 'masters', id })),
      onCancel: () => null
    })
  },[dispatch])


  return (
    <div className="adminPage__itemsBlock">
      <ItemsList
        withHead={true}
        items={masters}
        fields={{
          id:['Id', 'item-tiny'],
          name: ['Master Name ', 'item-medium'],
          rating: ['Rating ', 'item-medium'],
          cityId: ['City', 'item-medium', (id) => (cities.find((c) => +c.id === +id).name)
        ],
          comment: ['Comment', 'item-wide'],
        }}
        deleteItem={deleteHandler}
        saveItem={(formData) =>
          dispatch(admindataChanged(
            { sectionKey: 'masters', data: formData }, setEditMasterId))}
        editItem={(id) => {
          setEditMasterId(id)
          setIsAddingMaster(false)
        }}
        addItem={() => {
          setEditMasterId(null)
          setIsAddingMaster(true)
        }}
        editItemId={editMasterId}
        isAddingItem={isAddingMaster}
        EditForm={MasterEditForm}
        AddForm={MasterEditForm}
        
      />
    </div>
  )
}