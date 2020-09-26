import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { ItemsList } from '../../../components/ItemsList/ItemsList'
import { UserEditForm } from './UserEditBlock/UserEditBlock'



export const UsersBlock = () => {
  
  const users = useSelector((store) => store.admin.users)
  const [editUserId, setEditUserId] = useState()

  return (
    <div className="adminPage__itemsBlock">
      <ItemsList
        items={users}
        fields={{
          email:['e-mail','item-wide'],
          name:['name','item-medium'],
          isAdmin: ['is admin?', 'item-narrow'],
        }}        
        deleteItem={(id) => { console.log(`delete user ${id}`) }}
        editItem={(id) => { setEditUserId(id)}}
        addItem={() => { console.log('add user') }}
        editItemId={editUserId}
        EditForm={UserEditForm}

      />
    </div>
  )
}