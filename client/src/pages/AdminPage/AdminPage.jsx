import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
// import AppBar from '@material-ui/core/AppBar';

import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { Box } from '@material-ui/core'

import { Card } from '../../components/Card/Card'

import { CitiesBlock } from './CitiesBlock/CitiesBlock'
import { OrdersBlock } from './OrdersBlock/OrdersBlock'
import { UsersBlock } from './UsersBlock/UsersBlock'
import { fetchAdmindata } from '../../store/actions/admin'

import './AdminPage.scss'
import 'react-tabs/style/react-tabs.css'
import { ErrorMessageButton } from '../../components/ErrorMessage/ErrorMessage'
import { clearErrorMessage } from '../../store/actions/main'
import { withHumanizeError } from '../../HOC/withHumanizeError'

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

  const TabPanel = (props) => {
    const { children, selectedTab, index } = props

    return (
      <div
        hidden={selectedTab !== index}
        id={`simple-tabpanel-${index}`}
      >
        {selectedTab === index && (
          <Box p={3}>
            {children}
          </Box>
        )}
      </div>
    )
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
          <OrdersBlock />
        </Card>
      </TabPanel>
      <TabPanel selectedTab={selectedTab} index={1}>
        <Card header="Masters management">
          <div>Masters here (depends on cities)...</div>
          {/* <MastersBlock /> */}
        </Card>
      </TabPanel>
      <TabPanel selectedTab={selectedTab} index={2}>
        <Card header="Users management">
          <UsersBlock />
        </Card>
      </TabPanel>
      <TabPanel selectedTab={selectedTab} index={3}>
        <Card header="Cities management">
          <CitiesBlock />
        </Card>
      </TabPanel>
      <HumanizedErrorMessageButton />
    </div>
  )
}

export default AdminPage

// import React from 'react'
// import { useEffect, useCallback } from 'react'
// import { useDispatch } from 'react-redux'

// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

// import { Card } from '../../components/Card/Card'
// import { CitiesBlock } from './CitiesBlock/CitiesBlock'
// import { MastersBlock } from './MastersBlock/MastersBlock'
// import { OrdersBlock } from './OrdersBlock/OrdersBlock'
// import { UsersBlock } from './UsersBlock/UsersBlock'
// import { fetchAdmindata } from '../../store/actions/admin'

// import './AdminPage.scss';
// import 'react-tabs/style/react-tabs.css'
// import { ErrorMessageButton } from '../../components/ErrorMessage/ErrorMessage'
// import { clearErrorMessage } from '../../store/actions/main'
// import { withHumanizeError } from '../../HOC/withHumanizeError'

// const HumanizedErrorMessageButton = withHumanizeError(ErrorMessageButton)

// const AdminPage = () => {
//   const dispatch = useDispatch()

//   useEffect(() => {
//     dispatch(fetchAdmindata())
//   }, [dispatch])

//   const selectTabHandler = useCallback(() => {
//     dispatch(clearErrorMessage())
//     return true
//   },[dispatch])

//   return (
//     <div className="adminPage">
//       <Tabs
//       onSelect = {selectTabHandler}
//       >
//         <TabList>
//           <Tab>Orders</Tab>
//           <Tab>Masters</Tab>
//           <Tab>Users</Tab>
//           <Tab>Cities</Tab>
//         </TabList>
//         <TabPanel>
//           <Card header="Orders management" >
//             <OrdersBlock />
//           </Card>
//         </TabPanel>
//         <TabPanel>
//           <Card header="Masters management" >
//             <MastersBlock />
//           </Card>
//         </TabPanel>
//         <TabPanel>
//           <Card header="Users management" >
//             <UsersBlock />
//           </Card>
//         </TabPanel>
//         <TabPanel>
//           <Card header="Cities management" >
//             <CitiesBlock />
//           </Card>
//         </TabPanel>
//       </Tabs>

//       <HumanizedErrorMessageButton />
//     </div>
//   );
// };

// export default AdminPage;
