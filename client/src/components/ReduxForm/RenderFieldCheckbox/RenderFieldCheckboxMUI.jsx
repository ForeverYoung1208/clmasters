import { Checkbox, FormControlLabel, makeStyles } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles({
  root: {
    marginTop: '1rem',
  },
})

export const RenderFieldCheckbox = ({ label, input }) => {
  const classes = useStyles()
  return (
    <FormControlLabel
      classes={classes}
      label={label}
      control={<Checkbox {...input} checked={!!input.value} color="primary"/>}
    />
  )
}
