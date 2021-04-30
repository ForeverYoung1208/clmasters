import { Box } from '@material-ui/core'
import React from 'react'
import { Button } from '../Button/Button'
const handlePutOrderToGoogleCalendar = (order) => {
  //TODO: maybe, i should delete it (move to backend)
  console.log('[handlePutOrderToGoogleCalendar order]', order)
  
}

const OrderToGoogleCalendarBtn = ({order}) => (
  <Box display="flex" justifyContent="center">
    <Button onClick={() => handlePutOrderToGoogleCalendar(order)}>Put order #{order?.id} to google calendar</Button>
  </Box>
)

export default OrderToGoogleCalendarBtn
