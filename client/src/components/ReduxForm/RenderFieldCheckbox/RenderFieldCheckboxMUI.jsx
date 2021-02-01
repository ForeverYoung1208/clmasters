import { Checkbox, FormControlLabel, makeStyles } from '@material-ui/core'
import React, { useMemo } from 'react'

const useStyles = makeStyles({
  root: {
    marginTop: '2rem',
  },
})

export const RenderFieldCheckbox = ({ label, input }) => {
  const classes = useStyles()

  return (
    <FormControlLabel
      classes={classes}
      label={label}
      control={<Checkbox {...input} color="primary" />}
    />
  )
}
