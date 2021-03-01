import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  deleteCity,
  fetchCities,
  postCity,
  putCity,
} from '../../../store/actions/cities'
import { DataGrid } from '@material-ui/data-grid'
import { Box, IconButton, useTheme } from '@material-ui/core'
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from '@material-ui/icons'
import { CityEditDialog } from './CityEditDialog/CityEditDialog'
import { SubmissionError } from 'redux-form'
import { normalizeFormSubmitError } from '../../../shared/js/common'
import { Button } from '../../../components/Button/Button'
import { setErrorMessage } from '../../../store/actions/main'
import { CityDeleteDialog } from './CityDeleteDialog/CityDeleteDialog'
import { CityAddDialog } from './CityAddDialog/CityAddDialog'
import {
  CITIES_POST_REJECTED,
  CITIES_PUT_REJECTED,
} from '../../../store/actions/actionTypes/cities'

export const CitiesBlock = ({classes}) => {
  const dispatch = useDispatch()
  const cities = useSelector(({ cities }) => cities?.data)

  const [editingCityId, setEditingCityId] = useState(null)
  const [deletingCityId, setDeletingCityId] = useState(null)
  const [isAddingCity, setIsAddingCity] = useState(null)

  const startEditHandler = useCallback(
    (id) => {
      dispatch(setErrorMessage(''))
      setEditingCityId(id)
    },
    [dispatch]
  )
  const saveHandler = useCallback(
    async (city) => {
      const action = await dispatch(putCity({ city, setEditingCityId }))
      if (action.type === CITIES_PUT_REJECTED) {
        const formSubmitError = normalizeFormSubmitError(action.payload.errors)
        throw new SubmissionError(formSubmitError)
      }
    },
    [dispatch]
  )
  const closeEditHandler = useCallback(() => {
    setEditingCityId(null)
  }, [setEditingCityId])

  const startDeleteHandler = useCallback(
    (id) => {
      dispatch(setErrorMessage(''))
      setDeletingCityId(id)
    },
    [dispatch]
  )
  const deleteHandler = useCallback(
    (id) => {
      dispatch(deleteCity({ cityId: id, setDeletingCityId }))
    },
    [dispatch]
  )
  const closeDeleteHandler = useCallback(() => {
    setDeletingCityId(null)
  }, [setDeletingCityId])

  const startAddHandler = useCallback(() => {
    dispatch(setErrorMessage(''))
    setIsAddingCity(true)
  }, [dispatch])
  const addHandler = useCallback(
    async (city) => {
      const action = await dispatch(postCity({ city, setIsAddingCity }))
      if (action.type === CITIES_POST_REJECTED) {
        const formSubmitError = normalizeFormSubmitError(action.payload.errors)
        throw new SubmissionError(formSubmitError)
      }
    },
    [dispatch]
  )
  const closeAddHandler = useCallback(() => {
    setIsAddingCity(false)
  }, [setIsAddingCity])

  useEffect(() => {
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
    { field: 'name', headerName: 'City Name', width: 150 },
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
          rows={cities}
          columns={columnsDef}
          disableColumnReorder={true}
          pageSize={pageSize}
          rowsPerPageOptions={rowsPerPage}
        />

        <CityEditDialog
          caption={'Edit City'}
          open={!!editingCityId}
          onClose={closeEditHandler}
          onSave={saveHandler}
          cityId={editingCityId}
        />

        <CityAddDialog
          caption={'New City'}
          open={!!isAddingCity}
          onClose={closeAddHandler}
          onAdd={addHandler}
        />

        <CityDeleteDialog
          caption={'Delete City'}
          open={!!deletingCityId}
          onClose={closeDeleteHandler}
          onDelete={deleteHandler}
          cityId={deletingCityId}
        />
      </div>
      <Box p={2} display="flex" justifyContent="center">
        <Button onClick={startAddHandler}>
          Add City
          <AddIcon />
        </Button>
      </Box>
    </>
  )
}
