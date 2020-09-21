import React from 'react'
import { Button } from '../../Button/Button'
import { useState } from 'react'

import './Item.scss'

export const Item = ({ item, deleteItem, updateItem, fieldNames }) => {
  
  //TODO temporary
  fieldNames = ['name', 'type', 'email']
  //

  const [itemValues, setItemValues] = useState(item)

  // make item as store for all given fields
  
  return (
    <div className="items-list__item-element">

      {
        fieldNames.map((fieldName) => 
          <input key={fieldName} type="text" className="tems-list__item-name"
            value={itemValues[fieldName]}
            onChange={(e) => setItemValues(
              {
                ...itemValues,
                [fieldName]: e.target.value
              }
            )}
          />
        )
      }

      <span>
        <Button type='button' onClick={() => deleteItem(item.id)}> delete </Button>
      </span>
      <span>
        <Button type='button' onClick={() => updateItem(item.id, itemValues)}> update </Button>
      </span>
    </div>
  )
}