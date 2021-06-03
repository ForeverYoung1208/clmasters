import { Box, makeStyles } from '@material-ui/core'
import { format } from 'date-fns'
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
    fontSize: 'smaller',
  },
  dayHeader: {
    width: '100%',
    textAlign: 'center',
    fontWeight: 'bold',
    color: theme.palette.primary.dark
    
  },
  order: {
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}))

const DashboardDay = ({ orders = [], day, setShownOrderId }) => {
  const classes = useStyles()
  const dailyOrders = orders.filter((o) => +getDate(new Date(o.onTime)) === +day)
  
  return (
    <Box className={classes.root}>
      <div className={classes.dayHeader}>{day}</div>
      
      {dailyOrders && dailyOrders
        .sort(
          (a, b) => new Date(a.onTime).valueOf() - new Date(b.onTime).valueOf()
        )
        .map((o) => (
          <div
            key={o.id}
            className={classes.order}
            onClick={() => {
              setShownOrderId(o.id)
            }}
          >
            {format(new Date(o.onTime), 'HH:mm')}, ({o.masterName})
          </div>
        ))}
    </Box>
  )
}

export default DashboardDay
