import React, { useCallback } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ItemsList } from '../../../components/ItemsList/ItemsList'
import { admindataChanged, admindataDelete } from '../../../store/actions/admin'
import CityEditForm from './CityEditForm/CityEditForm'

import { myCofirm } from '../../../shared/js/myConfirm/myConfirm'


export const CitiesBlock = () => {

  const { cities } = useSelector((store) => store.admin)

  const [editCityId, setEditCityId] = useState()
  const [isAddingCity, setIsAddingCity] = useState(false)
  const dispatch = useDispatch()

  const deleteHandler = useCallback((id) => {
    myCofirm({
      title: 'Deleting city!',
      message: 'Are you sure?',
      onAgree: () => dispatch(admindataDelete({ sectionKey: 'cities', id })),
      onCancel: () => null
    })
  }, [dispatch])
  
  const saveHandler = useCallback((formData) => {
    if (!!formData.name.trim) {
      formData.name = formData.name.trim()
    }
    dispatch(
      admindataChanged({ sectionKey: 'cities', data: formData }, setEditCityId)
    )
  }, [dispatch])
  
  console.log('[editCityId]', editCityId)


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
        deleteItem={deleteHandler}
        saveItem={saveHandler}
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
