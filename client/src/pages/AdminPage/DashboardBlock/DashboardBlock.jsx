import { Box, makeStyles, Typography } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  root: {},
  googleLink: {
    backgroundColor: theme.palette.background.paper,
    margin: '1rem',
    borderRadius: 4,
    border: `solid 1px ${theme.palette.primary.light}`,
    padding: '1rem',
    textAlign: 'center'
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center',
    // flexDirection: 'column',
  },
}))

export const DashboardBlock = () => {
  const classes = useStyles()
  return (
    <div>
      <Box className = {classes.googleLink}>
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
    </div>
  )
}
