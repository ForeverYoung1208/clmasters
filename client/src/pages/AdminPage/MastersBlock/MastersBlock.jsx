import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  deleteMaster,
  fetchMasters,
  postMaster,
  putMaster,
} from '../../../store/actions/masters'
import { fetchCities } from '../../../store/actions/cities'
import { DataGrid } from '@material-ui/data-grid'
import { Box, IconButton, useTheme } from '@material-ui/core'
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from '@material-ui/icons'
import { MasterEditDialog } from './MasterEditDialog/MasterEditDialog'
import { SubmissionError } from 'redux-form'
import { normalizeFormSubmitError } from '../../../shared/js/common'
import { Button } from '../../../components/Button/Button'
import { setErrorMessage } from '../../../store/actions/main'
import {
  MASTERS_POST_REJECTED,
  MASTERS_PUT_REJECTED,
} from '../../../store/actions/actionTypes/masters'
import { MasterAddDialog } from './MasterAddDialog/MasterAddDialog'
import { MasterDeleteDialog } from './MasterDeleteDialog/MasterDeleteDialog'

export const MastersBlock = ({classes}) => {
  const dispatch = useDispatch()
  const masters = useSelector(({ masters }) => masters?.data)

  const [editingMasterId, setEditingMasterId] = useState(null)
  const [deletingMasterId, setDeletingMasterId] = useState(null)
  const [isAddingMaster, setIsAddingMaster] = useState(null)

  const startEditHandler = useCallback(
    (id) => {
      dispatch(setErrorMessage(''))
      setEditingMasterId(id)
    },
    [dispatch]
  )
  const saveHandler = useCallback(
    async (master) => {
      const action = await dispatch(putMaster({ master, setEditingMasterId }))
      if (action.type === MASTERS_PUT_REJECTED) {
        const formSubmitError = normalizeFormSubmitError(action.payload.errors)
        throw new SubmissionError(formSubmitError)
      }
    },
    [dispatch]
  )
  const closeEditHandler = useCallback(() => {
    setEditingMasterId(null)
  }, [setEditingMasterId])

  const startDeleteHandler = useCallback(
    (id) => {
      dispatch(setErrorMessage(''))
      setDeletingMasterId(id)
    },
    [dispatch]
  )
  const deleteHandler = useCallback(
    (id) => {
      dispatch(deleteMaster({ masterId: id, setDeletingMasterId }))
    },
    [dispatch]
  )
  const closeDeleteHandler = useCallback(() => {
    setDeletingMasterId(null)
  }, [setDeletingMasterId])

  const startAddHandler = useCallback(() => {
    dispatch(setErrorMessage(''))
    setIsAddingMaster(true)
  }, [dispatch])
  const addHandler = useCallback(
    async (master) => {
      const action = await dispatch(postMaster({ master, setIsAddingMaster }))
      if (action.type === MASTERS_POST_REJECTED) {
        const formSubmitError = normalizeFormSubmitError(action.payload.errors)
        throw new SubmissionError(formSubmitError)
      }
    },
    [dispatch]
  )
  const closeAddHandler = useCallback(() => {
    setIsAddingMaster(false)
  }, [setIsAddingMaster])

  useEffect(() => {
    dispatch(fetchMasters())
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

  const {
    pagination: { pageSize, rowsPerPage },
  } = useTheme()

  return (
    <>
      <div className={classes}>
        <DataGrid
          className="purple-borders-datagrid"
          showToolbar
          rows={masters}
          columns={columnsDef}
          disableColumnReorder={true}
          pageSize={pageSize}
          rowsPerPageOptions={rowsPerPage}
        />

        <MasterEditDialog
          caption={'Edit Master'}
          open={!!editingMasterId}
          onClose={closeEditHandler}
          onSave={saveHandler}
          masterId={editingMasterId}
        />

        <MasterAddDialog
          caption={'New Master'}
          open={!!isAddingMaster}
          onClose={closeAddHandler}
          onAdd={addHandler}
        />

        <MasterDeleteDialog
          caption={'Delete Master'}
          open={!!deletingMasterId}
          onClose={closeDeleteHandler}
          onDelete={deleteHandler}
          masterId={deletingMasterId}
        />
      </div>
      <Box p={2} display="flex" justifyContent="center">
        <Button onClick={startAddHandler}>
          Add Master
          <AddIcon />
        </Button>
      </Box>
    </>
  )
}
