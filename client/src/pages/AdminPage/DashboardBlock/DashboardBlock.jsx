import { Box, makeStyles, Typography } from '@material-ui/core'
import { getDate, getHours } from 'date-fns'
import React from 'react'
import { useSelector } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  root: {},
  googleLink: {
    backgroundColor: theme.palette.background.paper,
    margin: '1rem',
    borderRadius: 4,
    border: `solid 1px ${theme.palette.primary.light}`,
    padding: '1rem',
    textAlign: 'center',
  },
  dashboard: {margin:'1rem'},
  table: {
    tableLayout: 'fixed',
    width: '100%',
    border: `solid 1px ${theme.palette.primary.light}`,
    borderSpacing: 0,
  },
  td: {
    border: `solid 1px ${theme.palette.primary.light}`,
  },
  firstColumnHeader: {
    width: '40px',
    borderRight: `solid 1px ${theme.palette.primary.light}`,
  },
}))

const days = Array.from(Array(31), (el, i) => i + 1)
const hours = Array.from(Array(24), (el, i) => i + 1)

export const DashboardBlock = () => {
  const classes = useStyles()
  const orders = useSelector(({ orders }) => orders.data)
  
  //todo: make as useCallback
  const ordersByMonths = orders.reduce((accumulator, order) => {
    const orderDateTime = new Date(order.onTime);
    const orderMonth = orderDateTime.toLocaleString('default', { month: 'long' })
    const orderData = {
      orderDay: getDate(orderDateTime),
      orderStart: getHours(orderDateTime),
      orderEnd: getHours(new Date(
        orderDateTime.valueOf() +
        (new Date(`1970-01-01T${order.repairTime}Z`)).valueOf()
      ))
    }
    const i = accumulator.findIndex(a => a.month === orderMonth)
    if (i > 0) {
      accumulator[i].orders.push(orderData)
    } else {
      accumulator.push({
        month: orderMonth,
        orders: [orderData]
      })
    }
    return [ ...accumulator ]
  }, [])
  // desired structure:
  // [{ month:'January' , orders: [{},{},{}] }])
  
  // todo: issue: months are not agregated, need to debug!!!! or refactor... 

  console.log('[ordersByMonths]', ordersByMonths)

  
  return (
    <div>
      <Box className={classes.googleLink}>
        <Typography>
          To watch orders at google calendar use the following link: &emsp;
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://calendar.google.com/calendar/embed?src=uq3drdoc4lgcb7cgqr7m3dn3g0%40group.calendar.google.com&ctz=Europe%2FKiev"
          >
            Google&nbsp;calendar&nbsp;link
          </a>
        </Typography>
      </Box>
      <div className={classes.dashboard}>
        <table className={classes.table}>
          <thead>
            <tr>
                <th className={classes.firstColumnHeader} rowSpan='2'> days</th>
                <th colSpan='24'>Hours</th>
            </tr>
            <tr>
              {hours.map((hour) => (
                <th key={hour}>{hour}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {days.map((day) => (
              <tr key={day}>
                <td>{day}</td>
                {hours.map((hour) => (
                  <td className={classes.td}
                    key={hour}
                    data-day={day}
                    data-hour={hour}
                    onClick={(e) => console.log(e.target.dataset)}
                  >
                    &nbsp;
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
