import React from 'react'
import {makeStyles} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
  },
}))

export const PaymentSuccessful = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      "isSuccessful"
    </div>
  )
}

