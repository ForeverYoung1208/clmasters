import React, { useState } from 'react'
import { ItemsList } from '../../../components/ItemsList/ItemsList'
import { Button } from '../../../components/Button/Button'
import { useSelector } from 'react-redux'

import './MastersBlock.scss'

const CustomItem = (props) => {

  const { item, deleteItem, updateItem } = props
  const [itemValue, setItemValue] = useState(item.name || item.type || '')

  return (
    <div className="items-list__item-element">
      <input type="text" className="tems-list__item-name" value={itemValue} onChange={(e)=>setItemValue(e.target.value)}/>
      {/* <div> {item.name}</div> */}
      <span> <Button type='button' className='btn-no-paddings' onClick={()=> deleteItem(item.id)}> delete---- </Button></span>
      <span> <Button type='button' onClick={()=> updateItem(item.id)}> update---- </Button></span>
    </div>
  )
}


export const MastersBlock = () => {

  
  const masters = useSelector((store) => store.admin.masters)


  return (
    <div className="adminPage__itemsBlock">
      <ItemsList
        items={masters}
        itemComponent={CustomItem}
        deleteItem={ (id) => { console.log(`delete master ${id}`) }}
        updateItem={ (id) => { console.log(`update master ${id}`) }}
        addItem={() => { console.log('add master') }}
      />
    </div>
  )
}