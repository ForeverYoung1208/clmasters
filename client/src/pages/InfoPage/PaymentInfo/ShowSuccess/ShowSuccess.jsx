import React from 'react'
import { Typography, Box } from '@material-ui/core'

export const ShowSuccess = ({ orderId }) => {
  return (
    <Box p='10px'>
      <Typography>Thank You! The order #{orderId} has been payed!</Typography>
    </Box>
  )
}
