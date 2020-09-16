import React from 'react'
import { ItemsList } from '../../../components/ItemsList/ItemsList'
import { Button } from '../../../components/Button/Button'

const CustomItem = (props) => {

  // TODO
  const { item, deleteItem, updateItem } = props
  return (
    <>
      <div> {item.name}</div>
      <span> <Button type='button' className='btn-no-paddings' onClick={()=> deleteItem(item.id)}> delete---- </Button></span>
      <span> <Button type='button' onClick={()=> updateItem(item.id)}> update---- </Button></span>
    </>
  )
}


export const MastersBlock = () => {

  // TODO
  // const masters = useSelector((store) => store.voc.masters)
  const masters = [{ name: 'vasya', id:1 }, {name:'petya', id:2}]


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