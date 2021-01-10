import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCities, putCitiy } from '../../../store/actions/cities'
import { DataGrid } from '@material-ui/data-grid'
import { IconButton } from '@material-ui/core'
import './CitiesBlock.scss'

// import { DeleteIcon, EditIcon }  from '@material-ui/icons'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import { CityEditDialog } from './CityEditDialog/CityEditDialog'

export const CitiesBlock = () => {
  const dispatch = useDispatch()
  const [cities, citiesStatus, error] = useSelector(({ cities }) => [
    cities?.data,
    cities?.status,
    cities?.error,
  ])

  // cities.data: [ {id: 1, name: "Dnipro", comment: "", deletedAt: null}, ... ]
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [editingCityId, setEditingCityId] = React.useState(null)

  const editHandler = (id) => {
    setEditingCityId(id)
    setIsDialogOpen(true)
  }

  const saveHandler = (city) => {
    dispatch(putCitiy({ city, setIsDialogOpen }))
  }

  const deleteHandler = (id) => {
    console.log('[delete id]', id)
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
      />
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
