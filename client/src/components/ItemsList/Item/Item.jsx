import React from 'react'
import { Button } from '../../Button/Button'
import { useState } from 'react'

import './Item.scss'

export const Item = (props) => {
  const { item, deleteItem, updateItem } = props
  const [itemValue, setItemValue] = useState(item.name || item.type || '')
  

  return (
    <div className="items-list__item-element">
      
      <input type="text" className="tems-list__imem-name" value={itemValue} onChange={(e)=>setItemValue(e.target.value)}/>

      <span> <Button type='button' onClick={()=> deleteItem(item.id)}> delete </Button></span>
      <span> <Button type='button' onClick={()=> updateItem(item.id, itemValue)}> update </Button></span>
    </div>
  )
}