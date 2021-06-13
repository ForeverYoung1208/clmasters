// https://stripe.com/docs/development/quickstart
// https://stripe.com/docs/checkout/integration-builder

import React from 'react'
import {makeStyles} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
  },
}))

const PaymentBlock = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      payment widget here
      
    </div>
  )
}

export default PaymentBlock
