import {
  Box,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@material-ui/core'
import React, { useMemo } from 'react'

const useStyles = makeStyles((theme) => {
  return {
    root: {
      marginBottom: '2rem',
    },
    heading: {
      padding: '1rem',
    },
    cellLabel: {
      fontWeight: 'bolder',
    },
    cellData: {},
  }
})

export const OrdersInfo = ({ orders, heading }) => {
  const classes = useStyles()
  const fieldsToShow = useMemo(
    () => ({
      userName: 'Client name:',
      userEmail: 'Client email:',
      clockType: 'Clock Type:',
      masterName: 'Master:',
      masterCity: 'City:',
      onTimeStr: 'On Time:',
      comment: 'Comment',
    }),
    []
  )

  return (
    <div>
      <Typography align="center" variant="h6" className={classes.heading}>
        {heading}
      </Typography>
      {orders?.map((order) => {

        order.onTimeStr = (new Date(order.onTime)).toLocaleString('uk')

        return (
          <Box key={order.id} className={classes.root}>
            <Typography align="center" variant="h6">
              {`Order # ${order.id}`}
            </Typography>
            
            <Table size="small">
              <TableBody>
                {Object.keys(fieldsToShow).map((field) => (
                  <TableRow key={field}>
                    <TableCell className={classes.cellLabel}>
                      {fieldsToShow[field]}
                    </TableCell>
                    <TableCell className={classes.cellData}>
                      {order[field]}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        )
      })}
    </div>
  )
}
