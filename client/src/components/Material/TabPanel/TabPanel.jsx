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
  
  console.log('[classes]', classes)

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

// import React from 'react'
// import { Box } from '@material-ui/core'

// const panelStyles = {
//   bgcolor: 'background.paper',
//   borderColor: 'primary.main',
//   m: 1,
//   p: 2,
//   border: 1,
//   borderRadius: 4,
//   boxShadow: 2,
// }

// export const TabPanel = (props) => {
//   const { children, selectedTab, index } = props

//   return (
//     <div hidden={selectedTab !== index} id={`simple-tabpanel-${index}`}>
//       {selectedTab === index && <Box {...panelStyles}>{children}</Box>}
//     </div>
//   )
// }
