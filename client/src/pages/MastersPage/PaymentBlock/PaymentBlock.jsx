// https://stripe.com/docs/development/quickstart
// https://stripe.com/docs/checkout/integration-builder

import React from 'react'
import { makeStyles } from '@material-ui/core'
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

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
