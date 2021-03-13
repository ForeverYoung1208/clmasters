import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  deleteUser,
  fetchUsers,
  postUser,
  putUser,
} from '../../../store/actions/users'
import { Box } from '@material-ui/core'
import { Add as AddIcon } from '@material-ui/icons'
import { SubmissionError } from 'redux-form'
import { normalizeFormSubmitError } from '../../../shared/js/normalizeFormSubmitError'
import { Button } from '../../../components/Button/Button'
import { setErrorMessage } from '../../../store/actions/main'
import {
  USERS_POST_REJECTED,
  USERS_PUT_REJECTED,
} from '../../../store/actions/actionTypes/users'
import { UserEditDialog } from './UserEditDialog/UserEditDialog'
import { UserAddDialog } from './UserAddDialog/UserAddDialog'
import { UserDeleteDialog } from './UserDeleteDialog/UserDeleteDialog'
import ResponsiveDataGrid from '../../../components/Material/ResponsiveDataGrid/ResponsiveDataGrid'
import EditDeleteBtns from '../../../components/EditDeleteBtns/EditDeleteBtns'
import CompactUser from './CompactUser/CompactUser'

export const UsersBlock = ({ classes }) => {
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
  }, [dispatch])

  const columnsDef = useMemo(
    () => [
      { field: 'id', headerName: 'Id', width: 70 },
      { field: 'name', headerName: 'Name', flex: 1 },
      { field: 'email', headerName: 'E-mail', width: 250 },
      { field: 'isAdmin', headerName: 'Admin?', width: 110 },
      {
        field: 'actions',
        headerName: 'Actions',
        disableClickEventBubbling: true,
        disableColumnMenu: true,
        filterable: false,
        sortable: false,
        width: 120,
        renderCell: ({ row: { id } }) => (
          <EditDeleteBtns
            id={id}
            startEditHandler={startEditHandler}
            startDeleteHandler={startDeleteHandler}
          />
        ),
      },
    ],
    [startEditHandler, startDeleteHandler]
  )

  const compactColumnsDef = useMemo(
    () => [
      {
        field: 'user',
        headerName: 'Users',
        flex: 1,
        filterable: false,
        sortable: false,
        renderCell: CompactUser,
      },
      {
        field: 'actions',
        headerName: 'Actions',
        disableClickEventBubbling: true,
        disableColumnMenu: true,
        filterable: false,
        sortable: false,
        width: 120,
        renderCell: ({ row: { id } }) => (
          <EditDeleteBtns
            id={id}
            startEditHandler={startEditHandler}
            startDeleteHandler={startDeleteHandler}
          />
        ),
      },
    ],
    [startEditHandler, startDeleteHandler]
  )

  return (
    <>
      <div className={classes}>
        <ResponsiveDataGrid
          rows={users}
          columnsDef={columnsDef}
          compactColumnsDef={compactColumnsDef}
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
