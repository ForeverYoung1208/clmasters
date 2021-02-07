import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  makeStyles,
} from '@material-ui/core'
import React, { useMemo } from 'react'

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
  },
}))

export const RenderFieldSelect = ({
  options,
  label,
  input,
  meta: { touched, error, warning },
}) => {
  const classes = useStyles()
  const isError = useMemo(() => {
    if (!touched) return false
    if (error || warning) return true
    return false
  }, [touched, error, warning])

  const errorText = useMemo(() => {
    if (error) return error
    if (warning) return warning
  }, [error, warning])

  return (
    <FormControl className={classes.formControl} error={isError}>
      <InputLabel id={`select-label-${label}`}>{label}</InputLabel>
      <Select labelId={`select-label-${label}`} inputProps={{ ...input }}>
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {options &&
          options.map(({ id, name, type }) => (
            <MenuItem key={id} value={id}>
              {name||type}
            </MenuItem>
          ))}
      </Select>
      <FormHelperText>{errorText}</FormHelperText>
    </FormControl>
  )
}
