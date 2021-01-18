import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCities, putCitiy } from '../../../store/actions/cities'
import { DataGrid } from '@material-ui/data-grid'
import { IconButton } from '@material-ui/core'
import './CitiesBlock.scss'

import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from '@material-ui/icons'

import { CityEditDialog } from './CityEditDialog/CityEditDialog'
import { SubmissionError } from 'redux-form'
import { normalizeFormSubmitError } from '../../../shared/js/common'

export const CitiesBlock = () => {
  const dispatch = useDispatch()
  const [cities, citiesStatus] = useSelector(({ cities }) => [
    cities?.data,
    cities?.status,
  ])

  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [editingCityId, setEditingCityId] = React.useState(null)

  const editHandler = (id) => {
    setEditingCityId(id)
    setIsDialogOpen(true)
  }

  const saveHandler = async (city) => {
    const action = await dispatch(putCitiy({ city, setIsDialogOpen }))
    if (action.type === 'cities/put/rejected') {
      const formSubmitError = normalizeFormSubmitError(action.payload.errors)
      throw new SubmissionError(formSubmitError)
    }
  }

  const addHandler = () => {
    console.log('[add!]')
    // TODO: addHandler
  }

  const deleteHandler = (id) => {
    console.log('[delete id]', id)
    // TODO: deleteHandler
  }

  const closeHandler = () => {
    setIsDialogOpen(false)
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
          <IconButton onClick={() => editHandler(row.id)}>
            <EditIcon />
          </IconButton>

          <IconButton onClick={() => deleteHandler(row.id)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ]

  return (
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
      
TODO: button position
      
      <Button onClick={addHandler}>
        AddCity
        <AddIcon />
      </Button>

      <CityEditDialog
        caption={'Edit City'}
        open={isDialogOpen}
        onClose={closeHandler}
        onSave={saveHandler}
        cityId={editingCityId}
      />
    </div>
  )
}
