import React from 'react'
import { Typography, Box } from '@material-ui/core'

export const ShowFail = ({ orderId }) => {
  return (
    <Box p='10px'>
      <Typography>
        What a pity (((( something wrong wiht the payment (order #{orderId})
      </Typography>
    </Box>
  )
}
