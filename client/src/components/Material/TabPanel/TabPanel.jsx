import React from 'react'
import { Box, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    margin: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],
    display: 'flex',
    flexDirection: 'column'
  },
}))

export const TabPanel = ({ children, selectedTab, index }) => {
  const classes = useStyles()
  return (
    <div hidden={selectedTab !== index} id={`simple-tabpanel-${index}`}>
      {selectedTab === index &&
        <Box
          className={classes.root}
        >
          {children}
        </Box>}
    </div>
  )
}