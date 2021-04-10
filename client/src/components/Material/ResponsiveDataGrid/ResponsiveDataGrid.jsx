import { useMediaQuery, useTheme } from '@material-ui/core'
import { DataGrid } from '@material-ui/data-grid'
import React from 'react'

import './ResponsiveDataGrid.scss'

const ResponsiveDataGrid = ({
  rows,
  columnsDef,
  compactColumnsDef,
  paginationMode,
  onPageChange,
  onPageSizeChange,
  rowCount,
}) => {
  const {
    pagination: { pageSize, rowsPerPageOptions },
    breakpoints,
    sizes: { adminTableRowsHeight },
  } = useTheme()
  const matchesUpMd = useMediaQuery(breakpoints.up('md'))
  return (
    <>
      {matchesUpMd ? (
        <DataGrid
          disableDensitySelector
          rowHeight={adminTableRowsHeight.normal}
          columns={columnsDef}
          disableColumnMenu={false}
          className="purple-borders-datagrid"
          disableColumnReorder={true}
          rows={rows}
          pageSize={pageSize}
          rowsPerPageOptions={rowsPerPageOptions}
          paginationMode={paginationMode}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
          rowCount={rowCount}
        />
      ) : (
        <DataGrid
          rowHeight={adminTableRowsHeight.large}
          columns={compactColumnsDef}
          disableColumnMenu={true}
          className="purple-borders-datagrid"
          disableColumnReorder={true}
          rows={rows}
          pageSize={pageSize}
          rowsPerPageOptions={rowsPerPageOptions}
          paginationMode={paginationMode}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
          rowCount={rowCount}
        />
      )}
    </>
  )
}

export default ResponsiveDataGrid
