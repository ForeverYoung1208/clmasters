import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  deleteUser,
  fetchUsers,
  postUser,
  putUser,
} from '../../../store/actions/users'
import { fetchCities } from '../../../store/actions/cities'
import { DataGrid } from '@material-ui/data-grid'
import { Box, IconButton } from '@material-ui/core'
import './UsersBlock.scss'
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from '@material-ui/icons'
import { SubmissionError } from 'redux-form'
import { normalizeFormSubmitError } from '../../../shared/js/common'
import { Button } from '../../../components/Button/Button'
import { setErrorMessage } from '../../../store/actions/main'
import {
  USERS_POST_REJECTED,
  USERS_PUT_REJECTED,
} from '../../../store/actions/actionTypes/users'
import { UserEditDialog } from './UserEditDialog/UserEditDialog'
import { UserAddDialog } from './UserAddDialog/UserAddDialog'
import { UserDeleteDialog } from './UserDeleteDialog/UserDeleteDialog'

const PAGE_SIZE = 20
const ROWS_PER_PAGE_OPTIONS = [10, 20, 50]

export const UsersBlock = () => {
  const dispatch = useDispatch()
  const users = useSelector(({ users }) => users?.data)

  const [editingUserId, setEditingUserId] = useState(null)
  const [deletingUserId, setDeletingUserId] = useState(null)
  const [isAddingUser, setIsAddingUser] = useState(null)

  const startEditHandler = useCallback(
    (id) => {
      dispatch(setErrorMessage(''))
      setEditingUserId(id)
    },
    [dispatch]
  )
  const saveHandler = useCallback(
    async (user) => {
      const action = await dispatch(putUser({ user, setEditingUserId }))
      if (action.type === USERS_PUT_REJECTED) {
        const formSubmitError = normalizeFormSubmitError(action.payload.errors)
        throw new SubmissionError(formSubmitError)
      }
    },
    [dispatch]
  )
  const closeEditHandler = useCallback(() => {
    setEditingUserId(null)
  }, [setEditingUserId])

  const startDeleteHandler = useCallback(
    (id) => {
      dispatch(setErrorMessage(''))
      setDeletingUserId(id)
    },
    [dispatch]
  )
  const deleteHandler = useCallback(
    (id) => {
      dispatch(deleteUser({ userId: id, setDeletingUserId }))
    },
    [dispatch]
  )
  const closeDeleteHandler = useCallback(() => {
    setDeletingUserId(null)
  }, [setDeletingUserId])

  const startAddHandler = useCallback(() => {
    dispatch(setErrorMessage(''))
    setIsAddingUser(true)
  }, [dispatch])
  const addHandler = useCallback(
    async (user) => {
      const action = await dispatch(postUser({ user, setIsAddingUser }))
      if (action.type === USERS_POST_REJECTED) {
        const formSubmitError = normalizeFormSubmitError(action.payload.errors)
        throw new SubmissionError(formSubmitError)
      }
    },
    [dispatch]
  )
  const closeAddHandler = useCallback(() => {
    setIsAddingUser(false)
  }, [setIsAddingUser])

  useEffect(() => {
    dispatch(fetchUsers())
    dispatch(fetchCities())
  }, [dispatch])

  const renderActions = useCallback(
    ({ row }) => {
      return (
        <>
          <IconButton onClick={() => startEditHandler(row.id)}>
            <EditIcon />
          </IconButton>

          <IconButton onClick={() => startDeleteHandler(row.id)}>
            <DeleteIcon />
          </IconButton>
        </>
      )
    },
    [startEditHandler, startDeleteHandler]
  )

  const columnsDef = [
    { field: 'id', headerName: 'Id', width: 70 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'rating', headerName: 'Rating', width: 70 },
    { field: 'cityName', headerName: 'City', width: 150 },
    { field: 'comment', headerName: 'Comment', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      disableClickEventBubbling: true,
      disableColumnMenu: true,
      filterable: false,
      sortable: false,
      width: 120,
      renderCell: renderActions,
    },
  ]

  return (
    <>
      <div className="adminPage__itemsBlock">
        <DataGrid
          className="purple-borders-datagrid"
          showToolbar
          rows={users}
          columns={columnsDef}
          disableColumnReorder={true}
          pageSize={PAGE_SIZE}
          rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
        />

        <UserEditDialog
          caption={'Edit User'}
          open={!!editingUserId}
          onClose={closeEditHandler}
          onSave={saveHandler}
          userId={editingUserId}
        />

        <UserAddDialog
          caption={'New User'}
          open={!!isAddingUser}
          onClose={closeAddHandler}
          onAdd={addHandler}
        />

        <UserDeleteDialog
          caption={'Delete User'}
          open={!!deletingUserId}
          onClose={closeDeleteHandler}
          onDelete={deleteHandler}
          userId={deletingUserId}
        />
      </div>
      <Box p={2} display="flex" justifyContent="center">
        <Button onClick={startAddHandler}>
          Add User
          <AddIcon />
        </Button>
      </Box>
    </>
  )
}












// import React from 'react'
// import { useCallback } from 'react'
// import { useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { AiOutlineCheck } from 'react-icons/ai';

// import { ItemsList } from '../../../components/ItemsList/ItemsList'
// import { admindataChanged, admindataDelete } from '../../../store/actions/admin'
// import { myCofirm } from '../../../shared/js/myConfirm/myConfirm'

// import UserEditForm from './UserEditForm/UserEditForm'

// export const UsersBlock = () => {




//   const { users } = useSelector((store) => store.admin)

//   const [editUserId, setEditUserId] = useState()
//   const [isAddingUser, setIsAddingUser] = useState(false)
//   const dispatch = useDispatch()

//   const deleteHandler = useCallback((id) => {
//     myCofirm({
//       title: 'Deleting user!',
//       message: 'Are you sure?',
//       onAgree: () => dispatch(admindataDelete({ sectionKey: 'users', id })),
//       onCancel: () => null
//     })
//   },[dispatch])



//   return (
//     <div className="adminPage__itemsBlock">
//       <ItemsList
//         withHead={true}
//         items={users}
//         fields={{
//           id:['Id', 'item-tiny'],
//           name: ['User Name ', 'item-medium'],
//           email: ['Email', 'item-wide'],
//           isAdmin: ['Is Admin', 'item-narrow', (isAdmin) => {
//             return isAdmin
//               ? <AiOutlineCheck/>
//               : ' '
//           }],
//         }}
//         deleteItem={deleteHandler}
//         saveItem={(formData) =>
//           dispatch(admindataChanged(
//             { sectionKey: 'users', data: formData }, setEditUserId))}
//         editItem={(id) => {
//           setEditUserId(id)
//           setIsAddingUser(false)
//         }}
//         addItem={() => {
//           setEditUserId(null)
//           setIsAddingUser(true)
//         }}
//         editItemId={editUserId}
//         isAddingItem={isAddingUser}
//         EditForm={UserEditForm}
//         AddForm={UserEditForm}
//       />
//     </div>
//   )
// }
