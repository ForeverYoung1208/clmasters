import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  deleteCity,
  fetchCities,
  postCitiy,
  putCitiy,
} from '../../../store/actions/cities'
import { DataGrid } from '@material-ui/data-grid'
import { Box, IconButton } from '@material-ui/core'
import './CitiesBlock.scss'

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

export const CitiesBlock = () => {
  const dispatch = useDispatch()
  const [cities, citiesStatus] = useSelector(({ cities }) => [
    cities?.data,
    cities?.status,
  ])

  const [editingCityId, setEditingCityId] = React.useState(null)
  const [deletingCityId, setDeletingCityId] = React.useState(null)
  const [addingCityId, setAddingCityId] = React.useState(null)

  const startEditHandler = (id) => {
    dispatch(setErrorMessage(''))
    setEditingCityId(id)
  }
  const saveHandler = async (city) => {
    const action = await dispatch(putCitiy({ city, setEditingCityId }))
    if (action.type === 'cities/put/rejected') {
      const formSubmitError = normalizeFormSubmitError(action.payload.errors)
      throw new SubmissionError(formSubmitError)
    }
  }
  const closeEditHandler = () => {
    setEditingCityId(null)
  }

  const startDeleteHandler = (id) => {
    dispatch(setErrorMessage(''))
    setDeletingCityId(id)
  }
  const deleteHandler = (id) => {
    dispatch(deleteCity({ cityId: id, setDeletingCityId }))
  }
  const closeDeleteHandler = () => {
    setDeletingCityId(null)
  }

  const startAddHandler = () => {
    dispatch(setErrorMessage(''))
    setAddingCityId(true)
  }
  const addHandler = async (city) => {
    const action = await dispatch(postCitiy({ city, setAddingCityId }))
    if (action.type === 'cities/post/rejected') {
      const formSubmitError = normalizeFormSubmitError(action.payload.errors)
      throw new SubmissionError(formSubmitError)
    }
  }
  const closeAddHandler = () => {
    setAddingCityId(false)
  }

  useEffect(() => {
    if (citiesStatus === 'idle') {
      dispatch(fetchCities())
    }
  }, [citiesStatus, dispatch])

  const columnsDef = [
    { field: 'id', headerName: 'Id', width: 80 },
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
      renderCell: ({ row }) => (
        <>
          <IconButton onClick={() => startEditHandler(row.id)}>
            <EditIcon />
          </IconButton>

          <IconButton onClick={() => startDeleteHandler(row.id)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ]

  return (
    <>
      <div className="adminPage__itemsBlock">
        <DataGrid
          className="purple-borders-datagrid"
          showToolbar
          rows={cities}
          columns={columnsDef}
          disableColumnReorder={true}
          pageSize={20}
          rowsPerPageOptions={[10, 20, 50]}
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
          open={!!addingCityId}
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
          AddCity
          <AddIcon />
        </Button>
      </Box>
    </>
  )
}
