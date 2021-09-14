import React from 'react'
import { useDispatch } from 'react-redux'
import { Tabs, Tab, Box, makeStyles } from '@material-ui/core'
import { TabPanel } from '../../components/Material/TabPanel/TabPanel'
import { CitiesBlock } from './CitiesBlock/CitiesBlock'
import { UsersBlock } from './UsersBlock/UsersBlock'
import { MastersBlock } from './MastersBlock/MastersBlock'
import { OrdersBlock } from './OrdersBlock/OrdersBlock'
import { DashboardBlock } from './DashboardBlock/DashboardBlock'
import { Link, useRouteMatch } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { ErrorMessageButton } from '../../components/ErrorMessage/ErrorMessage'
import {
  clearErrorMessage,
  rememberSelectedAdminTab,
} from '../../store/actions/main'
import { withHumanizeError } from '../../HOC/withHumanizeError'

import './AdminPage.scss'

const ADMIN_ROUTES = {
  orders: '/admin/orders',
  masters: '/admin/masters',
  users: '/admin/users',
  cities: '/admin/cities',
  dashboard: '/admin/dashboard',
}

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
    [theme.breakpoints.up('md')]: {
      width: theme.breakpoints.values.md - theme.spacing(2),
    },
    display: 'flex',
    flexDirection: 'column',
  },
  itemsBlock: {
    display: 'flex',
    minHeight: '300px',
    flexGrow: 1,
  },
  tab: {
    [theme.breakpoints.down('sm')]: {
      width: '90px',
      minWidth: '90px',
    },
  },
}))

const HumanizedErrorMessageButton = withHumanizeError(ErrorMessageButton)

const AdminPage = () => {
  const dispatch = useDispatch()

  const urlMatch = useRouteMatch('/admin/:page')
  const { lastSelectedAdminTab } = useSelector(({ main }) => main)

  let selectedTab = ADMIN_ROUTES.orders
  if (urlMatch?.params?.page) {
    selectedTab = `/admin/${urlMatch?.params?.page}`
  } else if (lastSelectedAdminTab) {
    selectedTab = lastSelectedAdminTab
  }

  const handleTabChange = (event, selectedAdminTab) => {
    dispatch(rememberSelectedAdminTab(selectedAdminTab))
    dispatch(clearErrorMessage())
  }
  const classes = useStyles()
  return (
    <Box className={classes.root}>
      <Tabs value={selectedTab} onChange={handleTabChange} centered>
        <Tab
          label="Orders"
          to={ADMIN_ROUTES.orders}
          value={ADMIN_ROUTES.orders}
          className={classes.tab}
          component={Link}
        />
        <Tab
          label="Masters"
          to={ADMIN_ROUTES.masters}
          value={ADMIN_ROUTES.masters}
          className={classes.tab}
          component={Link}
        />
        <Tab
          label="Users"
          to={ADMIN_ROUTES.users}
          value={ADMIN_ROUTES.users}
          className={classes.tab}
          component={Link}
        />
        <Tab
          label="Cities"
          to={ADMIN_ROUTES.cities}
          value={ADMIN_ROUTES.cities}
          className={classes.tab}
          component={Link}
        />
        <Tab
          label="Dashboard"
          to={ADMIN_ROUTES.dashboard}
          value={ADMIN_ROUTES.dashboard}
          className={classes.tab}
          component={Link}
        />
      </Tabs>

      <TabPanel selectedTab={selectedTab} index={ADMIN_ROUTES.orders}>
        <OrdersBlock classes={classes.itemsBlock} />
      </TabPanel>
      <TabPanel selectedTab={selectedTab} index={ADMIN_ROUTES.masters}>
        <MastersBlock classes={classes.itemsBlock} />
      </TabPanel>
      <TabPanel selectedTab={selectedTab} index={ADMIN_ROUTES.users}>
        <UsersBlock classes={classes.itemsBlock} />
      </TabPanel>
      <TabPanel selectedTab={selectedTab} index={ADMIN_ROUTES.cities}>
        <CitiesBlock classes={classes.itemsBlock} />
      </TabPanel>
      <TabPanel selectedTab={selectedTab} index={ADMIN_ROUTES.dashboard}>
        <DashboardBlock />
      </TabPanel>
      <HumanizedErrorMessageButton />
    </Box>
  )
}

export default AdminPage
