import React from 'react'
import { Button } from '../Button/Button'
import { Item} from './Item/Item'

export const ItemsList = (props) => {
  const { items, deleteItem, updateItem, addItem, itemComponent } = props
  const _Item = itemComponent ? itemComponent : Item

  return (
    <div className="items-block">
      <div className="items-list">
        {items?.map(i =>
          <_Item item={i} key={i.id} deleteItem={deleteItem} updateItem={updateItem}>
            
          </_Item>)}
      </div>

      <div className="items-list__add-item">
        <input type="text" /> <Button type='button' onClick={addItem}>add</Button>
      </div>

    </div>
  )
}