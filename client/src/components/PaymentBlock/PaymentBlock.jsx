import React from 'react'
import { Box, makeStyles, Modal, Typography } from '@material-ui/core'
import { loadStripe } from '@stripe/stripe-js'
import { Button } from '../Button/Button'
import { apiPaymentCreateSession } from '../../shared/js/api/payment'
import { OrdersInfo } from '../../pages/InfoPage/OrdersInfo/OrdersInfo'
import { useDispatch } from 'react-redux'
import { setErrorMessage } from '../../store/actions/main'

const REACT_APP_STRIPE_PK =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_STRIPE_PK_PRODUCTION
    : process.env.REACT_APP_STRIPE_PK_DEVELOPMENT

const stripePromise = loadStripe(REACT_APP_STRIPE_PK)

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    maxWidth: '80%',
    padding: theme.spacing(1),
  },
}))

const PaymentBlock = ({ orderForPay, isOpen, closeHandler }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const {payedSum, price} = orderForPay

  const handlePaymentClick = async (event) => {
    const stripe = await stripePromise
    const session = await apiPaymentCreateSession(orderForPay.id)

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    })

    if (result.error) {
      console.log('Payment error [result]: ', result)
      dispatch(setErrorMessage(JSON.stringify(result.error)))
    }
  }

  return (
    <Modal open={isOpen} onClose={closeHandler} className={classes.modal}>
      <Box className={classes.root}>
        <Typography variant="h6" align="center"></Typography>
        <OrdersInfo
          orders={[orderForPay]}
          heading={'Submit order for payment?'}
          showPaymentInfo={false}
        />
        <Box alignContent="center" align="center">
          <Button onClick={handlePaymentClick}>
            Submit ${price - payedSum} for pay
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default PaymentBlock
