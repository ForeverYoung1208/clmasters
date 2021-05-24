import { makeStyles } from '@material-ui/core'
import React, { useCallback, useMemo } from 'react'
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
  root: {
    border: `solid 1px ${theme.palette.primary.light}`,
    cursor: 'pointer',
    '&:hover': {
      border: `solid 1px ${theme.palette.primary.main}`,
      animation: '$fadeInOut 1s infinite',
    },
  },
  '@keyframes fadeInOut': {
    '0%': { opacity: 0.5 },
    '50%': { opacity: 1 },
    '100%': { opacity: 0.5 },
  },

  busyHour: {
    backgroundColor: theme.palette.primary.main,
  },
  freeHour: {
    backgroundColor: theme.palette.background.paper.dark,
  },
}))

export const HourCell = ({
  currentHour,
  currentDay, // only for data-attribute
  ordersInDay, //: [{orderDay, orderStart, orderEnd, orderId }, {...}, ...]
  clickHandler,
}) => {
  const classes = useStyles()
  const handleHourClick = useCallback((e) => {
    if (e.target.dataset.orderid) {
      clickHandler(e.target.dataset.orderid)
    }
  }, [clickHandler])
  
  const foundOrderId = useMemo(() => {
    for (const o of ordersInDay) {
      if (
        currentHour >= o.orderStart &&
        currentHour <= o.orderEnd
      ) {
        return o.orderId
      }
    }
    return null
  }, [currentHour, ordersInDay])

  return (
    <td
      className={clsx({
        [classes.root]: true,
        [classes.busyHour]: !!foundOrderId,
        [classes.freeHour]: !foundOrderId,
      })}
      data-day={currentDay}
      data-hour={currentHour}
      data-orderid={foundOrderId}
      onClick={handleHourClick}
    >
      &nbsp;
    </td>
  )
}
