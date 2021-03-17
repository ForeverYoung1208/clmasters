import { IconButton } from '@material-ui/core'
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@material-ui/icons'
import React from 'react'

const EditDeleteBtns = ({ id, startEditHandler, startDeleteHandler }) => {
  return (
    <>
      <IconButton onClick={() => startEditHandler(id)}>
        <EditIcon />
      </IconButton>

      <IconButton onClick={() => startDeleteHandler(id)}>
        <DeleteIcon />
      </IconButton>
    </>
  )
}

export default EditDeleteBtns
