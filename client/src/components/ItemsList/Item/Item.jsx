import React from 'react'
import { Button } from '../../Button/Button'
import { useState } from 'react'

import './Item.scss'

export const Item = ({ item, deleteItem, updateItem, fields }) => {
  
  const [itemValues, setItemValues] = useState(item)
  const fieldKeys = Object.keys(fields)
  const inputIdent = Date.now()
  
  
  return (
    <div className="items-list__item-element">

      {
        fieldKeys && fieldKeys.map((fieldKey) =>
          <div key={fieldKey}  className={"items-list__item-field " + fields[fieldKey][1]} >
            <label htmlFor={fieldKey+inputIdent}>{fields[fieldKey][0]}</label>
            
            <input type="text" 
              value={itemValues[fieldKey]}
              id={fieldKey+inputIdent}
              onChange={(e) => setItemValues(
                {
                  ...itemValues,
                  [fieldKey]: e.target.value
                }
              )}
            />
          </div>
        )
      }
      

      <div className = "items-list__item-buttons">
        <Button type='button' onClick={() => deleteItem(item.id)}> delete </Button>
        <Button type='button' onClick={() => updateItem(item.id, itemValues)}> update </Button>
      </div>
    </div>
  )
}