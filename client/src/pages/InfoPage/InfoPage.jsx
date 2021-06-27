import React, { useCallback } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { OrdersInfo } from './OrdersInfo/OrdersInfo'
import { Button } from '../../components/Button/Button'
import { redirectTo } from '../../store/actions/main'
import EmailSearchForm from './EmailSearchForm/EmailSearchForm'
import { Box, Card, makeStyles } from '@material-ui/core'
import { setRegisteredOrder } from '../../store/actions/preorders'
import { clearFoundOrders, searchOrdersBy } from '../../store/actions/orders'
import { Route, Switch } from 'react-router'
import PaymentInfo from './PaymentInfo/PaymentInfo'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    margin: '1rem',
  },
  card: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: 4,
    boxShadow: '0px 1px 4px 0px',
    maxHeight: '80vh',
    overflow: 'auto',
  },
  controls: {
    padding: '1rem',
  },
}))

const InfoPage = () => {
  let [registeredOrder, foundOrders] = useSelector(({ orders }) => [
    orders?.registeredOrder,
    orders?.foundOrders,
  ])
  const [searchString, setSearchString] = useState('')
  const dispatch = useDispatch()

  const handleBackToForm = useCallback(
    (e) => {
      // e.preventDefault()
      dispatch(redirectTo('/masters/preorder'))
    },
    [dispatch]
  )

  const handleSearchOrders = useCallback(
    ({ searchString }) => {
      setSearchString(searchString)
      dispatch(searchOrdersBy({ email: searchString }))
    },
    [setSearchString, dispatch]
  )

  const handleClearRegisteredOrders = useCallback(() => {
    dispatch(setRegisteredOrder(null))
  }, [dispatch])

  const handleClearFoundOrders = useCallback(() => {
    dispatch(clearFoundOrders())
  }, [dispatch])

  const classes = useStyles()
  return (
    <>
      <Switch>
        <Route path="/info/payment/successfull">
          <PaymentInfo isSuccessful={true} />
        </Route>
        <Route path="/info/payment/canceled">
          <PaymentInfo isSuccessful={false} />
        </Route>
        <Route path="/info">
          <Box className={classes.root}>
            {registeredOrder && (
              <Card className={classes.card}>
                <OrdersInfo
                  orders={[registeredOrder]}
                  heading="Congratulations! New order was registered!"
                />
                {registeredOrder.isEmailSent && (
                  <h3>(order information was also sent to email)</h3>
                )}
                <Box
                  className={classes.controls}
                  display="flex"
                  justifyContent="space-between"
                >
                  <Button
                    onClick={handleBackToForm}
                    variant="text"
                    color="primary"
                  >
                    Make another order
                  </Button>
                  <Button onClick={handleClearRegisteredOrders}>Ok</Button>
                </Box>
              </Card>
            )}

            {foundOrders && (
              <Card className={classes.card}>
                <OrdersInfo
                  orders={foundOrders}
                  heading={`We've found the next orders with e-mail "${searchString}"`}
                />
              </Card>
            )}

            {!foundOrders && !registeredOrder && (
              <Card className={classes.card}>
                <EmailSearchForm onSubmit={handleSearchOrders} />
              </Card>
            )}

            {foundOrders && (
              <Box
                className={classes.controls}
                display="flex"
                alignSelf="center"
              >
                <Button onClick={handleClearFoundOrders}>
                  Clear information
                </Button>
              </Box>
            )}
          </Box>
        </Route>
      </Switch>
    </>
  )
}

export default InfoPage
