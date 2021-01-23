import React from 'react'
import { useDispatch } from 'react-redux'
import { setErrorMessage } from '../../../store/actions/main'
import { Delete as DeleteIcon, Edit as EditIcon } from '@material-ui/icons'
import { IconButton } from '@material-ui/core'

import './Item.scss'

export const Item = ({ item, deleteItem, editItem, fields }) => {
  const dispatch = useDispatch()

  const fieldKeys = Object.keys(fields)

  const editHandler = (item) => {
    dispatch(setErrorMessage(''))
    editItem(item.id, item)
  }

  const deleteHandler = (item) => {
    dispatch(setErrorMessage(''))
    deleteItem(item.id)
  }

  return (
    <div className="items-list__item-element">
      {fieldKeys &&
        fieldKeys.map((fieldKey) => {
          const transformFunc =
            fields[fieldKey][2] ||
            function (a) {
              return a
            }
          return (
            <div
              key={fieldKey}
              className={'items-list__item-field ' + fields[fieldKey][1]}
            >
              {transformFunc(item[fieldKey])}
            </div>
          )
        })}

      <div className="items-list__item-buttons">
        <IconButton
          onClick={() => {
            editHandler(item)
          }}
        >
          <EditIcon />
        </IconButton>

        <IconButton
          onClick={() => {
            deleteHandler(item)
          }}
        >
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  )
}
