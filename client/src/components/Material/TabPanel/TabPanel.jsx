import React from 'react'
import { Box, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    margin: '1rem',
    borderRadius: 4,
    boxShadow: '0px 1px 4px 0px',
  },
}))

export const TabPanel = (props) => {
  const { children, selectedTab, index } = props
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