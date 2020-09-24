import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { ItemsList } from '../../../components/ItemsList/ItemsList'
import { CityEditForm } from './CitiesEditForm/CitiesEditForm'



export const CitiesBlock = () => {
  
  const cities = useSelector((store) => store.voc.cities)
  const [editCityId, setEditCityId] = useState()

  return (
    <div className="adminPage__itemsBlock">
      <ItemsList
        items={cities}
        fields={{
          name: ['name', 'item-medium'],
          comment: ['comment','item-wide']
        }}
        
        deleteItem={ (id) => { console.log(`delete city ${id}`) }}
        editItem={(id) => { setEditCityId(id)}}
        addItem={() => { console.log('add city') }}
        editItemId={editCityId}
        EditForm={CityEditForm}
      />
    </div>
  )
}