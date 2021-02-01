import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { Tabs, Tab } from '@material-ui/core'
import { TabPanel } from '../../components/Material/TabPanel/TabPanel'

import { Card } from '../../components/Card/Card'

import { CitiesBlock } from './CitiesBlock/CitiesBlock'
import { OrdersBlock } from './OrdersBlock/OrdersBlock'
import { UsersBlock } from './UsersBlock/UsersBlock'
import { fetchAdmindata } from '../../store/actions/admin'

import './AdminPage.scss'
import { ErrorMessageButton } from '../../components/ErrorMessage/ErrorMessage'
import { clearErrorMessage } from '../../store/actions/main'
import { withHumanizeError } from '../../HOC/withHumanizeError'
import { MastersBlock } from './MastersBlock/MastersBlock'

const HumanizedErrorMessageButton = withHumanizeError(ErrorMessageButton)

const AdminPage = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAdmindata())
  }, [dispatch])

  const [selectedTab, setSelectedTab] = React.useState(0)

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue)
    dispatch(clearErrorMessage())
  }


  return (
    <div className="adminPage">
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        centered
      >
        <Tab label="Orders" />
        <Tab label="Masters" />
        <Tab label="Users" />
        <Tab label="Cities" />
      </Tabs>
      <TabPanel selectedTab={selectedTab} index={0}>
        <Card header="Orders management">
          {/* <OrdersBlock /> */}
          OrdersBlock here (depends on cities, masters)
        </Card>
      </TabPanel>
      <TabPanel selectedTab={selectedTab} index={1}>
        <MastersBlock/>
      </TabPanel>
      <TabPanel selectedTab={selectedTab} index={2}>
        <UsersBlock />
      </TabPanel>
      <TabPanel selectedTab={selectedTab} index={3}>
        <CitiesBlock />
      </TabPanel>
      <HumanizedErrorMessageButton />
    </div>
  )
}

export default AdminPage
