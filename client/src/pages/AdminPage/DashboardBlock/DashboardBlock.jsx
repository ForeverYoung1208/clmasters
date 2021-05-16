import { Box, makeStyles, Typography } from '@material-ui/core'
import { getDate, getDaysInMonth, getHours } from 'date-fns'
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'

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
  dashboard: { margin: '1rem' },
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


export const DashboardBlock = () => {
  const classes = useStyles()
  const orders = useSelector(({ orders }) => orders.data)
  const days = useCallback((monthAndYear) => {
    const d = new Date(monthAndYear)
    return Array.from(Array(getDaysInMonth(d)), (el, i) => i + 1)
  }, [])

  const hours = Array.from(Array(24), (el, i) => i + 1)


  const [month, setMonth] = useState()
  const [ordersByMonths, setOrdersByMonths] = useState()

  useEffect(() => {
    let orderMonth = 'No Orders'

    const _ordersByMonths = orders
      .sort((o1, o2) => (new Date(o1.onTime)).valueOf() - (new Date(o2.onTime)).valueOf())
      .reduce((accumulator, order) => {
      const orderDateTime = new Date(order.onTime)
      orderMonth = orderDateTime.toLocaleString('default', {
        year: 'numeric',
        month: 'long',
      })
      const orderData = {
        orderDay: getDate(orderDateTime),
        orderStart: getHours(orderDateTime),
        orderEnd:
          getHours(
            new Date(
              orderDateTime.valueOf() +
                new Date(`1970-01-01T${order.repairTime}Z`).valueOf()
            )
          ) - 1,
      }
      if (accumulator[orderMonth]) {
        accumulator[orderMonth].push(orderData)
      } else {
        accumulator[orderMonth] = [orderData]
      }
      return accumulator
    }, {}) // reduce
    // result structure:
    // { 'January 2021': [{orderDay, orderStart, orderEnd },{...},{...}, ... ] })
    
    setMonth(orderMonth)
    setOrdersByMonths(_ordersByMonths)
    
  }, [orders]) //useEffect


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
        <>
          <Typography align="center">
            <ArrowLeftIcon /> {month} <ArrowRightIcon />{' '}
          </Typography>
          <table className={classes.table}>
            <thead>
              <tr>
                <th className={classes.firstColumnHeader} rowSpan="2">
                  {' '}
                  days
                </th>
                <th colSpan="24">Hours</th>
              </tr>
              <tr>
                {hours.map((hour) => (
                  <th key={hour}>{hour}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {days('May 2021').map((day) => (
                <tr key={day}>
                  <td>{day}</td>
                  {hours.map((hour) => (
                    <td
                      className={classes.td}
                      key={hour}
                      data-day={day}
                      data-hour={hour}
                      onClick={(e) => console.log(e.target.dataset)}
                    >
                      
                      // TODO: conditional rendering
                      &nbsp;
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      </div>
    </div>
  )
}
