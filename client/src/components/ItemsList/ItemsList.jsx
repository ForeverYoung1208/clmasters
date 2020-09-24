import React from 'react'
import { Button } from '../Button/Button'
import { Item as StandartItem } from './Item/Item'

import './ItemsList.scss'

export const ItemsList = ({
  items, deleteItem, editItem, addItem, itemComponent, fields
}) => {

  const Item = itemComponent ? itemComponent : StandartItem

  return (
    <div className="items-block">
      <div className="items-list">
        {items?.map(i =>
          <Item item={i} key={i.id}
            fields={fields}
            deleteItem={deleteItem}
            editItem={editItem}
          />
        )}
      </div>

      <div className="items-list__add-item">
        <Button type='button' onClick={addItem}>add</Button>
      </div>

    </div>
  )
}