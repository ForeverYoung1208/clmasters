import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCities } from '../../../store/actions/cities'
import { DataGrid } from '@material-ui/data-grid'
import { IconButton } from '@material-ui/core'

// import { DeleteIcon, EditIcon }  from '@material-ui/icons'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

export const CitiesBlock = () => {
  const dispatch = useDispatch()
  const [cities, citiesStatus] = useSelector(({ cities }) => [
    cities?.data,
    cities?.status,
  ])
  // cities: [ {id: 1, name: "Dnipro", comment: "", deletedAt: null}, ... ]
  
  const editHandler = (id) => {console.log('[edit id]', id)}
  const deleteHandler = (id) => {console.log('[delete id]', id)}

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

  useEffect(() => {
    if (citiesStatus === 'idle') {
      dispatch(fetchCities())
    }
  }, [citiesStatus, dispatch])

  return (
    <div className="adminPage__itemsBlock">
      <DataGrid
        showToolbar
        rows={cities}
        columns={columnsDef}
        disableColumnReorder={true}
      />
    </div>
  )
}