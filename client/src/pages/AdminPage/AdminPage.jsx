import React from 'react'
import { useDispatch } from 'react-redux'
import { Tabs, Tab, Box, makeStyles } from '@material-ui/core'
import { TabPanel } from '../../components/Material/TabPanel/TabPanel'
import { CitiesBlock } from './CitiesBlock/CitiesBlock'
import { UsersBlock } from './UsersBlock/UsersBlock'
import { MastersBlock } from './MastersBlock/MastersBlock'
import { OrdersBlock } from './OrdersBlock/OrdersBlock'

import { ErrorMessageButton } from '../../components/ErrorMessage/ErrorMessage'
import { clearErrorMessage } from '../../store/actions/main'
import { withHumanizeError } from '../../HOC/withHumanizeError'

import './AdminPage.scss'



const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },    
    [theme.breakpoints.up('md')]: {
      width: theme.breakpoints.values.md - theme.spacing(2),
    },
    [theme.breakpoints.up('lg')]: {
      width: theme.breakpoints.values.lg - theme.spacing(2)
    },
    display: 'flex',
    flexDirection: 'column',
  },
  itemsBlock: {
    display: 'flex',
    minHeight: '300px',
    flexGrow: 1,
  },
}))

const HumanizedErrorMessageButton = withHumanizeError(ErrorMessageButton)

const AdminPage = () => {
  const dispatch = useDispatch()
  const [selectedTab, setSelectedTab] = React.useState(0)
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue)
    dispatch(clearErrorMessage())
  }
  const classes = useStyles()

  return (
    <Box className={classes.root}>
      <Tabs value={selectedTab} onChange={handleTabChange} centered>
        <Tab label="Orders" />
        <Tab label="Masters" />
        <Tab label="Users" />
        <Tab label="Cities" />
      </Tabs>
      <TabPanel selectedTab={selectedTab} index={0}>
        <OrdersBlock classes={classes.itemsBlock} />
      </TabPanel>
      <TabPanel selectedTab={selectedTab} index={1}>
        <MastersBlock classes={classes.itemsBlock} />
      </TabPanel>
      <TabPanel selectedTab={selectedTab} index={2}>
        <UsersBlock classes={classes.itemsBlock} />
      </TabPanel>
      <TabPanel selectedTab={selectedTab} index={3}>
        <CitiesBlock classes={classes.itemsBlock} />
      </TabPanel>
      <HumanizedErrorMessageButton />
    </Box>
  )
}

export default AdminPage
