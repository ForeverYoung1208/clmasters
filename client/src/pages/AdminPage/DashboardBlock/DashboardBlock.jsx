import { Box, Button, makeStyles, Typography } from '@material-ui/core'
import { addMonths, format, getDaysInMonth } from 'date-fns'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import DashboardDay from './DashboardDay/DashboardDay'
import { fetchOrders } from '../../../store/actions/orders'
import { OrderInfoDialog } from './OrderInfoDialog/OrderInfoDialog'

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
  days: {
    display: 'flex',
    flexWrap: 'wrap',
  },
}))

export const DashboardBlock = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const orders = useSelector(({ orders }) => orders.data)
  const [shownOrderId, setShownOrderId] = useState(null)
  const [currentMonthStr, setCurrentMonth] = useState(
    format(new Date(), 'yyyy-MM')
  )
  const daysOfMonth = useCallback((monthStr) => {
    if (!monthStr) return []
    const d = new Date(monthStr)
    return Array.from(Array(getDaysInMonth(d)), (el, i) => i + 1)
  }, [])

  const handleMonthChange = useCallback(
    (direction) => {
      let monthDate = new Date(currentMonthStr)
      switch (direction) {
        case 'inc':
          monthDate = addMonths(monthDate, 1)
          break

        case 'dec':
          monthDate = addMonths(monthDate, -1)
          break

        case 'today':
        default:
          monthDate = new Date()
          break
      }
      const monthStr = format(monthDate, 'yyyy-MM')

      setCurrentMonth(monthStr)
    },
    [setCurrentMonth, currentMonthStr]
  )

  useEffect(() => {
    dispatch(fetchOrders({ monthStr: currentMonthStr }))
  }, [dispatch, currentMonthStr])

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
        <Typography align="center">
          <Button
            onClick={() => {
              handleMonthChange('dec')
            }}
          >
            <ArrowLeftIcon />
          </Button>
          {new Date(currentMonthStr).toLocaleDateString('default', {
            year: 'numeric',
            month: 'long',
          })}
          <Button
            onClick={() => {
              handleMonthChange('inc')
            }}
          >
            <ArrowRightIcon />
          </Button>
        </Typography>
        <Box className={classes.days}>
          {daysOfMonth(currentMonthStr).map((day) => (
            <DashboardDay
              key={day}
              orders={orders}
              day={day}
              setShownOrderId={setShownOrderId}
            />
          ))}
        </Box>
      </div>

      <OrderInfoDialog
        open={!!shownOrderId}
        orderId={shownOrderId}
        closeDialogHandler={() => setShownOrderId(null)}
      />
    </div>
  )
}
