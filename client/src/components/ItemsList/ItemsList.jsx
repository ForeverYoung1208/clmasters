import React from 'react'
import { Button } from '../Button/Button'
import { Item } from './Item/Item'

import './ItemsList.scss'

const ItemsHead = ({ fields }) => {
  const fieldKeys = Object.keys(fields)
  return (
    <div className='items-list__head'>
      {fieldKeys?.map((fkey) => (
        <div key={fkey} className={"items-list__head-element " +fields[fkey][1] }>
          {fields[fkey][0]}
        </div>
      ))}

    </div>
  )
}

export const ItemsList = ({
  withHead,
  items,
  fields,
  deleteItem,
  editItem,
  addItem,
  saveItem,
  editItemId,
  EditForm,
  isAddingItem,
  AddForm
}) => {

  return (
    
    <div className="items-list">
      {withHead && <ItemsHead fields={fields}/>}
      <div className="items-list__body">
        {items?.map(item => ( 
          item.id === editItemId
            ? <EditForm
              key={item.id}
              item={item}
              onSubmit={saveItem}
            />
            : <Item
              key={item.id}
              item={item}
              fields={fields}
              deleteItem={deleteItem}
              editItem={editItem}
            />
        )
        )}
      </div>

      <div className="items-list__add-item">
        {isAddingItem && 
          <AddForm
            onSubmit={saveItem}
          />
        }
        <Button type='button' onClick={addItem}>add</Button>
      </div>

    </div>
  )
}