import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ItemsList } from '../../../components/ItemsList/ItemsList'
import { admindataChanged, admindataDelete } from '../../../store/actions/admin'
import UserEditForm from './UserEditForm/UserEditForm'

export const UsersBlock = () => {

  const { users } = useSelector((store) => store.admin)

  const [editUserId, setEditUserId] = useState()
  const [isAddingUser, setIsAddingUser] = useState(false)
  const dispatch = useDispatch()

  return (
    <div className="adminPage__itemsBlock">
      <ItemsList
        withHead={true}
        items={users}
        fields={{
          id:['Id', 'item-tiny'],
          name: ['User Name ', 'item-medium'],
          email: ['Email', 'item-wide'],
          isAdmin: ['Is Admin', 'item-narrow', (isAdmin) => {
            return isAdmin ? 'true' : 'false'
          }],
        }}
        deleteItem={(id) => {
          window.confirm('Are you sure?') &&
            dispatch(admindataDelete({ sectionKey: 'users', id }))
        }}
        saveItem={(formData) =>
          dispatch(admindataChanged(
            { sectionKey: 'users', data: formData }, setEditUserId))}
        editItem={(id) => {
          setEditUserId(id)
          setIsAddingUser(false)
        }}
        addItem={() => {
          setEditUserId(null)
          setIsAddingUser(true)
        }}
        editItemId={editUserId}
        isAddingItem={isAddingUser}
        EditForm={UserEditForm}
        AddForm={UserEditForm}
      />
    </div>
  )
}
