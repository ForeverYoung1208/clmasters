import { Box } from '@material-ui/core'
import React from 'react'
import { Button } from '../Button/Button'

const OrderToGoogleCalendarBtn = ({order}) => (
  <Box display="flex" justifyContent="center">
    <Button>Put order #{order.id} to google calendar</Button>
  
  </Box>
)

export default OrderToGoogleCalendarBtn
