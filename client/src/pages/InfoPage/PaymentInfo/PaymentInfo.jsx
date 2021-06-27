import React from 'react'
import {makeStyles} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
  },
}))

const PaymentInfo = ({isSuccessful}) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      {isSuccessful
        ? "isSuccessful"
        : "NOT isSuccessful"
      }
      
    </div>
  )
}

export default PaymentInfo
