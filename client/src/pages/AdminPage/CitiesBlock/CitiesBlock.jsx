import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ItemsList } from '../../../components/ItemsList/ItemsList'
import { admindataChanged, admindataDelete } from '../../../store/actions/admin'
import CityEditForm from './CityEditForm/CityEditForm'

export const CitiesBlock = () => {

  const { cities } = useSelector((store) => store.admin)

  const [editCityId, setEditCityId] = useState()
  const [isAddingCity, setIsAddingCity] = useState(false)
  const dispatch = useDispatch()

  return (
    <div className="adminPage__itemsBlock">
      <ItemsList
        withHead={true}
        items={cities}
        fields={{
          id:['Id', 'item-tiny'],
          name: ['City Name ', 'item-medium'],
          comment: ['Comment', 'item-wide'],
        }}
        deleteItem={(id) => {
          window.confirm('Are you sure?') &&
            dispatch(admindataDelete({ sectionKey: 'cities', id }))
        }}
        saveItem={(formData) =>
          dispatch(admindataChanged(
            { sectionKey: 'cities', data: formData }, setEditCityId))}
        editItem={(id) => {
          setEditCityId(id)
          setIsAddingCity(false)
        }}
        addItem={() => {
          setEditCityId(null)
          setIsAddingCity(true)
        }}
        editItemId={editCityId}
        isAddingItem={isAddingCity}
        EditForm={CityEditForm}
        AddForm={CityEditForm}
      />
    </div>
  )
}
