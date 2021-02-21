import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { OrdersInfo } from './OrdersInfo/OrdersInfo'
import { Button } from '../../components/Button/Button'
import { redirectTo } from '../../store/actions/main'
import EmailSearchForm from './EmailSearchForm/EmailSearchForm'
import { Box, Card } from '@material-ui/core'
import { setRegisteredOrder } from '../../store/actions/preorders'

const InfoPage = () => {
  let [registeredOrder, foundOrders] = useSelector(({ orders }) => [
    orders?.registeredOrder,
    orders?.foundOrders,
  ])

  // registeredOrder = {
  //   id: 357,
  //   clockId: 1,
  //   clock: {
  //     type: 'big'
  //   },
  //   masterId: 1,
  //   userId: 1,
  //   comment: null,
  //   onTime: '2021-02-21T13:00:00.000Z',
  //   deletedAt: null,
  //   user: {
  //     name: 'Ігор Щербина',
  //     email: 'siafin2010@gmail.com',
  //   },
  //   master: {
  //     id: 1,
  //     name: 'Master 1',
  //     cityId: 1,
  //     comment: 'Initial master12121',
  //     deletedAt: null,
  //     rating: 5,
  //     createdAt: '2020-09-02T19:37:23.212Z',
  //     updatedAt: '2020-10-11T18:54:11.350Z',
  //     city: {
  //       id: 1,
  //       name: 'Dnipro',
  //       comment: 'the best!',
  //       createdAt: '2020-09-02T19:37:23.203Z',
  //       updatedAt: '2021-01-23T22:42:16.747Z',
  //       deletedAt: null,
  //     },
  //   },
  // }

  const [searchString, setSearchString] = useState('')
  const dispatch = useDispatch()

  const handleBackToForm = (e) => {
    // e.preventDefault()
    dispatch(redirectTo('/masters/preorder'))
  }

  const handleSearchOrders = ({ searchString }) => {
    setSearchString(searchString)
    console.log('dispatch(getOrdersBy({ email: searchString }))')
  }

  const handleClearRegisteredOrders = () => {
    dispatch(setRegisteredOrder(null))
  }

  const handleClearFoundOrders = () => {
    console.log('dispatch(setFoundOrders(null))')
  }

  return (
    <>
      {registeredOrder && (
        <Box>
          <OrdersInfo
            orders={[registeredOrder]}
            heading="Congratulations! New order was registered!"
          />
          {registeredOrder.isEmailSent && (
            <h3>(order information was also sent to email)</h3>
          )}
          <Box display='flex' justifyContent='space-between'>
            <Button onClick={handleBackToForm} variant="text" color='primary'>Make another order</Button>
            <Button onClick={handleClearRegisteredOrders}>Ok</Button>
          </Box>
        </Box>
      )}

      {foundOrders && (
        <Card>
          <h2>We've found the next orders with e-mail "{searchString}":</h2>
          <OrdersInfo orders={foundOrders} />
          <Button 
            onClick={handleClearFoundOrders()}
          >
            Clear information
          </Button>
        </Card>
      )}

      {!foundOrders && !registeredOrder && (
        <Box>
          <EmailSearchForm onSubmit={handleSearchOrders} />
        </Box>
      )}
    </>
  )
}

export default InfoPage
