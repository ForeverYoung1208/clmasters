import React from 'react'
import { Button } from '../Button/Button'
import { Item } from './Item/Item'

import './ItemsList.scss'

export const ItemsList = ({
  items, deleteItem, updateItem, addItem, itemComponent, fields
}) => {

  const _Item = itemComponent ? itemComponent : Item

  return (
    <div className="items-block">
      <div className="items-list">
        {items?.map(i =>
          <_Item item={i} key={i.id}
            fields={fields}
            deleteItem={deleteItem}
            updateItem={updateItem}
          >
            
          </_Item>)}
      </div>

      <div className="items-list__add-item">
        <input type="text" /> <Button type='button' onClick={addItem}>add</Button>
      </div>

    </div>
  )
}