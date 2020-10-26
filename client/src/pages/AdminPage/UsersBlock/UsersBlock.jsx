import React from 'react'
import { useCallback } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ItemsList } from '../../../components/ItemsList/ItemsList'
import { myCofirm } from '../../../shared/js/myConfirm/myConfirm'
import { admindataChanged, admindataDelete } from '../../../store/actions/admin'

import UserEditForm from './UserEditForm/UserEditForm'

export const UsersBlock = () => {




  const { users } = useSelector((store) => store.admin)

  const [editUserId, setEditUserId] = useState()
  const [isAddingUser, setIsAddingUser] = useState(false)
  const dispatch = useDispatch()

  const deleteHandler = useCallback((id) => {
    myCofirm({
      title: 'Deleting user!',
      message: 'Are you sure?',
      onAgree: () => dispatch(admindataDelete({ sectionKey: 'users', id })),
      onCancel: () => null
    })
  },[dispatch])



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
        deleteItem={deleteHandler}
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
