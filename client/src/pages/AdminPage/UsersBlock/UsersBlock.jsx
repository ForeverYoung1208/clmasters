import React from 'react'
import { useSelector } from 'react-redux'
import { ItemsList } from '../../../components/ItemsList/ItemsList'



export const UsersBlock = () => {
  
  const users = useSelector((store) => store.admin.users)
  // const users = [{ name: 'babavasya', id:1 }, {name:'babapetya', id:2}]

  return (
    <div className="adminPage__itemsBlock">
      <ItemsList
        items={users}
        fields={{
          email:['e-mail','adminPage__field--email'],
          name:['name','adminPage__field--name'],
          isAdmin: ['is admin?', 'adminPage__field--boolean'],
        }}        
        deleteItem={ (id) => { console.log(`delete user ${id}`) }}
        updateItem={ (id) => { console.log(`update user ${id}`) }}
        addItem={() => { console.log('add user') }}

      />
    </div>
  )
}