import React from 'react'
import { useSelector } from 'react-redux'
import { ItemsList } from '../../../components/ItemsList/ItemsList'



export const UsersBlock = () => {
  
  // const users = useSelector((store) => store.voc.cities)
  const users = [{ name: 'babavasya', id:1 }, {name:'babapetya', id:2}]

  return (
    <div className="adminPage__itemsBlock">
      <ItemsList
        items={users}
        deleteItem={ (id) => { console.log(`delete user ${id}`) }}
        updateItem={ (id) => { console.log(`update user ${id}`) }}
        addItem={() => { console.log('add user') }}

      />
    </div>
  )
}