import { Box, makeStyles } from '@material-ui/core'
import { getDate } from 'date-fns/esm'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'inline-block',
    width: '176px',
    height: '100px',
    border: '1px solid',
    padding: '0.1rem',
    margin: '0.1rem',
    overflow: 'auto',
  },
}))

const DashboardDay = ({ orders=[], day }) => {
  const classes = useStyles()
  const dailyOrders = orders.filter(o => +getDate(new Date(o.onTime)) === +day)
  return (
    <Box className={classes.root}>
      {dailyOrders.map((o) => (
        <div key={o.id}>
          <li>{o.id}</li>
          <li>{o.masterName}</li>
        </div>
      ))}
    </Box>
  )
}

export default DashboardDay
