import React from 'react'
import { makeStyles } from '@material-ui/core'
import { PaymentSuccessful } from "./PaymentSuccessful/PaymentSuccessful"
import { PaymentNotSuccessful } from "./PaymentNotSuccessful/PaymentNotSuccessful"

const useStyles = makeStyles((theme) => ({
  root: {
  },
}))

const PaymentInfo = ({isSuccessful}) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      {isSuccessful
        ? <PaymentSuccessful/>
        : <PaymentNotSuccessful/>
      }
      
    </div>
  )
}

export default PaymentInfo
