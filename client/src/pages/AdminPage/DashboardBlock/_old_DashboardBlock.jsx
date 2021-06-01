import { Box, Button, makeStyles, Typography } from '@material-ui/core'
import { getDate, getDaysInMonth, getHours } from 'date-fns'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import { HourCell } from './HourCell/HourCell'
import { OrderInfoDialog } from './OrderInfoDialog/OrderInfoDialog'
import { fetchOrders } from '../../../store/actions/orders'

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
  firstColumnHeader: {
    width: '40px',
    borderRight: `solid 1px ${theme.palette.primary.light}`,
  },
}))

const DashboardBlock = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const orders = useSelector(({ orders }) => orders.data)
  const daysOfMonth = useCallback((monthAndYear) => {
    if (!monthAndYear) return []
    const d = new Date(monthAndYear)
    return Array.from(Array(getDaysInMonth(d)), (el, i) => i + 1)
  }, [])

  const hours = Array.from(Array(24), (el, i) => i + 1)

  const [month, setMonth] = useState()
  const [ordersByMonths, setOrdersByMonths] = useState()
  const [shownOrderId, setShownOrderId] = useState(null)
 
  const handleMonthChange = useCallback((direction) => {
    const usedMonths = Object.keys(ordersByMonths)
    const monthIndex = usedMonths.findIndex(m => m === month)
    if (direction==='dec' && monthIndex > 0) {
      setMonth(usedMonths[monthIndex-1])
    }
    if (direction==='inc' && monthIndex < usedMonths.length-1) {
      setMonth(usedMonths[monthIndex+1])
    }
    
    
  }, [ordersByMonths,month])
  
  useEffect(() => {
    let ordersMonth = 'No Orders'

    const _ordersByMonths = orders
      .sort(
        (o1, o2) =>
          new Date(o1.onTime).valueOf() - new Date(o2.onTime).valueOf()
      )
      .reduce((accumulator, order) => {
        const orderDateTime = new Date(order.onTime)
        ordersMonth = orderDateTime.toLocaleString('default', {
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
          orderId: order.id,
        }
        if (accumulator[ordersMonth]) {
          accumulator[ordersMonth].push(orderData)
        } else {
          accumulator[ordersMonth] = [orderData]
        }
        return accumulator
      }, {}) // reduce
    // result structure:
    // { 'January 2021': [{orderDay, orderStart, orderEnd },{...},{...}, ... ] })

    setMonth(ordersMonth)
    setOrdersByMonths(_ordersByMonths)
  }, [orders]) //useEffect
  
  useEffect(() => {
    dispatch(fetchOrders())
  }, [dispatch])

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
            <Button onClick={() => { handleMonthChange('dec') }}><ArrowLeftIcon /></Button>
            {month}
            <Button onClick={() => { handleMonthChange('inc') }}><ArrowRightIcon /></Button>
          </Typography>
          <table className={classes.table}>
            <thead>
              <tr>
                <th className={classes.firstColumnHeader} rowSpan="2">
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
              {daysOfMonth(month).map((day) => (
                <tr key={day}>
                  <td>{day}</td>
                  {hours.map((hour) => (
                    <HourCell
                      key={day + hour}
                      currentHour={hour}
                      currentDay={day}
                      ordersInDay={ordersByMonths[month].filter(o => o.orderDay === day)}
                      clickHandler={(orderId) => {setShownOrderId(orderId)}}
                    />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      </div>
      
      <OrderInfoDialog
        open={!!shownOrderId}
        orderId={shownOrderId}
        closeDialogHandler={() => setShownOrderId(null)}
      />
      
    </div>
  )
}
