import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  deleteCity,
  fetchCities,
  postCity,
  putCity,
} from '../../../store/actions/cities'
import { DataGrid } from '@material-ui/data-grid'
import { Box, useTheme } from '@material-ui/core'
import { Add as AddIcon } from '@material-ui/icons'
import { CityEditDialog } from './CityEditDialog/CityEditDialog'
import { SubmissionError } from 'redux-form'
import { normalizeFormSubmitError } from '../../../shared/js/normalizeFormSubmitError'
import { Button } from '../../../components/Button/Button'
import {
  setErrorMessage,
  setPaginationPageSize,
} from '../../../store/actions/main'
import { CityDeleteDialog } from './CityDeleteDialog/CityDeleteDialog'
import { CityAddDialog } from './CityAddDialog/CityAddDialog'
import {
  CITIES_POST_REJECTED,
  CITIES_PUT_REJECTED,
} from '../../../store/actions/actionTypes/cities'
import EditDeleteBtns from '../../../components/EditDeleteBtns/EditDeleteBtns'

export const CitiesBlock = ({ classes }) => {
  const dispatch = useDispatch()

  const { data: cities, totalCount } = useSelector(({ cities }) => cities)
  const { paginationPageSize } = useSelector(({ main }) => main)

  const [editingCityId, setEditingCityId] = useState(null)
  const [deletingCityId, setDeletingCityId] = useState(null)
  const [isAddingCity, setIsAddingCity] = useState(null)

  const [currentPage, setCurrentPage] = useState(0)

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
    dispatch(fetchCities({ page: 0, pageSize: paginationPageSize }))
  }, [dispatch, paginationPageSize])

  const handlePageChange = useCallback(
    ({ page, pageSize }) => {
      setCurrentPage(page)
      dispatch(fetchCities({ page, pageSize }))
    },
    [dispatch, setCurrentPage]
  )
  const handlePageSizeChange = useCallback(
    ({ pageSize }) => {
      dispatch(fetchCities({ page: 0, pageSize }))
      dispatch(setPaginationPageSize(pageSize))
      setCurrentPage(0)
    },
    [dispatch, setCurrentPage]
  )

  const columnsDef = [
    { field: 'id', headerName: 'Id', width: 70 },
    { field: 'name', headerName: 'City Name', width: 150 },
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
  ]

  const {
    pagination: { rowsPerPageOptions },
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
          rowsPerPageOptions={rowsPerPageOptions}
          paginationMode="server"
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          rowCount={totalCount}
          page={currentPage}
          pageSize={paginationPageSize}
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
