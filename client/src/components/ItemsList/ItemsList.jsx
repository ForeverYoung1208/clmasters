import React from 'react'
import { Button } from '../Button/Button'
import { Item } from './Item/Item'

import './ItemsList.scss'

export const ItemsList = ({
  items,
  fields,
  deleteItem,
  editItem,
  addItem,
  editItemId,
  EditForm
}) => {

  return (
    <div className="items-block">
      <div className="items-list">
        {items?.map(i => ( 

          i.id === editItemId
            ? <EditForm key={i.id} />
            : <Item item={i} key={i.id}
              fields={fields}
              deleteItem={deleteItem}
              editItem={editItem}
          />
        )
        )}
      </div>

      <div className="items-list__add-item">
        <Button type='button' onClick={addItem}>add</Button>
      </div>

    </div>
  )
}