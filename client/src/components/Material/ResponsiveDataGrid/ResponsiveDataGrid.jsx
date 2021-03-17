import { useMediaQuery, useTheme } from '@material-ui/core'
import { DataGrid } from '@material-ui/data-grid'
import React from 'react'

const ResponsiveDataGrid = ({ rows, columnsDef, compactColumnsDef }) => {
  const {
    pagination: { pageSize, rowsPerPage },
    breakpoints,
    sizes: { adminTableRowsHeight },
  } = useTheme()
  const matchesUpMd = useMediaQuery(breakpoints.up('md'))
  return (
    <>
      {matchesUpMd ? (
        <DataGrid
          showToolbar
          disableColumnReorder
          disableDensitySelector
          rowHeight={adminTableRowsHeight.normal}
          className="purple-borders-datagrid"
          rows={rows}
          columns={columnsDef}
          pageSize={pageSize}
          rowsPerPageOptions={rowsPerPage}
        />
      ) : (
        <DataGrid
          disableColumnMenu
          disableColumnReorder
          showToolbar={false}
          rowHeight={adminTableRowsHeight.large}
          className="purple-borders-datagrid"
          rows={rows}
          columns={compactColumnsDef}
          pageSize={pageSize}
          rowsPerPageOptions={rowsPerPage}
        />
      )}
    </>
  )
}

export default ResponsiveDataGrid
