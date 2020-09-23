import React from 'react'
import { Button } from '../Button/Button'
import { Item as StandartItem } from './Item/Item'

import './ItemsList.scss'

export const ItemsList = ({
  items, deleteItem, updateItem, addItem, itemComponent, fields
}) => {

  const Item = itemComponent ? itemComponent : StandartItem

  return (
    <div className="items-block">
      <div className="items-list">
        {items?.map(i =>
          <Item item={i} key={i.id}
            fields={fields}
            deleteItem={deleteItem}
            updateItem={updateItem}
          >
            
          </Item>)}
      </div>

      <div className="items-list__add-item">
        <input type="text" /> <Button type='button' onClick={addItem}>add</Button>
      </div>

    </div>
  )
}