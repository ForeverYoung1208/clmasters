import React from 'react'
import { useDispatch } from 'react-redux'
import { setErrorMessage } from '../../../store/actions/main'
import { Button } from '../../Button/Button'

import './Item.scss'

export const Item = ({ item, deleteItem, editItem, fields }) => {
  const dispatch = useDispatch()
  
  const fieldKeys = Object.keys(fields)
  
  const editHandler = (item) => {
    dispatch(setErrorMessage(''))
    editItem(item.id, item)
  }
  
  const deleteHandler = (item) => {
    dispatch(setErrorMessage(''))
    deleteItem(item.id)
  }
  
  return (
    <div className="items-list__item-element">

      {
        fieldKeys && fieldKeys.map((fieldKey) => {
          const transformFunc = fields[fieldKey][2] || function (a) { return a }
          return (
            <div key={fieldKey} className={"items-list__item-field " + fields[fieldKey][1]} >
              {transformFunc(item[fieldKey])}
            </div>
          )
        })
      }
      

      <div className = "items-list__item-buttons">
        <Button type='button' onClick={() => { editHandler(item) }}> edit </Button>
        <Button type='button' onClick={() => { deleteHandler(item) }}> delete </Button>
      </div>
    </div>
  )
}