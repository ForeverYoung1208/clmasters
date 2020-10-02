import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ItemsList } from '../../../components/ItemsList/ItemsList'
import { admindataChanged, admindataDelete } from '../../../store/actions/admin'
import { MasterEditForm } from './MasterEditForm/MasterEditForm'

import './MastersBlock.scss'

export const MastersBlock = () => {

  const { masters, cities } = useSelector((store) => store.admin)

  const [editMasterId, setEditMasterId] = useState()
  const [isAddingMaster, setIsAddingMaster] = useState(false)
  const dispatch = useDispatch()

  return (
    <div className="adminPage__itemsBlock">
      <ItemsList
        withHead={true}
        items={masters}
        fields={{
          name: ['Master Name ', 'item-medium'],
          cityId: ['City', 'item-medium', (id) => (cities.find((c) => +c.id === +id).name)
        ],
          comment: ['Comment', 'item-wide'],
        }}
        deleteItem={(id) => {
          window.confirm('Are you sure?') &&
            dispatch(admindataDelete({ sectionKey: 'masters', id }))
        }}
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