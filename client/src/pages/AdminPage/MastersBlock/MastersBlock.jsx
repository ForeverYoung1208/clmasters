import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  deleteMaster,
  fetchMasters,
  postMaster,
  putMaster,
} from '../../../store/actions/masters'
import { Box } from '@material-ui/core'
import { Add as AddIcon } from '@material-ui/icons'
import { MasterEditDialog } from './MasterEditDialog/MasterEditDialog'
import { SubmissionError } from 'redux-form'
import { normalizeFormSubmitError } from '../../../shared/js/normalizeFormSubmitError'
import { Button } from '../../../components/Button/Button'
import { setErrorMessage } from '../../../store/actions/main'
import {
  MASTERS_POST_REJECTED,
  MASTERS_PUT_REJECTED,
} from '../../../store/actions/actionTypes/masters'
import { MasterAddDialog } from './MasterAddDialog/MasterAddDialog'
import { MasterDeleteDialog } from './MasterDeleteDialog/MasterDeleteDialog'
import EditDeleteBtns from '../../../components/EditDeleteBtns/EditDeleteBtns'
import CompactMaster from './CompactMaster/CompactMaster'
import ResponsiveDataGrid from '../../../components/Material/ResponsiveDataGrid/ResponsiveDataGrid'

export const MastersBlock = ({ classes }) => {
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
        const formSubmitError = normalizeFormSubmitError(action.payload?.errors)
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
  }, [dispatch])

  const columnsDef = useMemo(
    () => [
      { field: 'id', headerName: 'Id', width: 70 },
      { field: 'name', headerName: 'Name', width: 150 },
      { field: 'rating', headerName: 'Rating', width: 100 },
      { field: 'hourRate', headerName: 'Hour Rate', width: 150 },
      { field: 'cityName', headerName: 'City', width: 150 },
      { field: 'comment', headerName: 'Comment', flex: 1 },
      { field: 'isActive', headerName: 'Active', width: 100 },      
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
        field: 'master',
        headerName: 'Masters',
        flex: 1,
        filterable: false,
        sortable: false,
        renderCell: CompactMaster,
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
          rows={masters}
          columnsDef={columnsDef}
          compactColumnsDef={compactColumnsDef}
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
