import React from 'react'
import { Button } from '../../Button/Button'

import './Item.scss'

export const Item = ({ item, deleteItem, editItem, fields }) => {
  
  const fieldKeys = Object.keys(fields)
  
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
        <Button type='button' onClick={() => editItem(item.id, item)}> edit </Button>
        <Button type='button' onClick={() => deleteItem(item.id)}> delete </Button>
      </div>
    </div>
  )
}