import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { ItemsList } from '../../../components/ItemsList/ItemsList'
import { MasterEditForm } from './MasterEditForm/MasterEditForm'

import './MastersBlock.scss'

export const MastersBlock = () => {

  const masters = useSelector((store) => store.admin.masters)
  const [editMasterId, setEditMasterId] = useState()

  return (
    <div className="adminPage__itemsBlock">
      <ItemsList
        items={masters}
        fields={{
          name: ['Master Name ', 'item-medium'],
          cityId: ['City', 'item-narrow'],
          comment: ['comment', 'item-wide'],
        }}
        deleteItem={(id) => { console.log(`delete master ${id}`) }}
        editItem={(id) => { setEditMasterId(id)}}
        addItem={() => { console.log('add master') }}
        editItemId={editMasterId}
        EditForm={MasterEditForm}
      />
    </div>
  )
}