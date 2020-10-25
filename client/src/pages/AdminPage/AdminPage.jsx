import React from 'react'
import { useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

import { Card } from '../../components/Card/Card'
import { CitiesBlock } from './CitiesBlock/CitiesBlock'
import { MastersBlock } from './MastersBlock/MastersBlock'
import { OrdersBlock } from './OrdersBlock/OrdersBlock'
import { UsersBlock } from './UsersBlock/UsersBlock'
import { fetchAdmindata } from '../../store/actions/admin'

import './AdminPage.scss';
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



  const selectTabHandler = useCallback(() => {
    dispatch(clearErrorMessage())
    return true    
  },[dispatch])
  
  return (
    <div className="adminPage">
      <Tabs
      onSelect = {selectTabHandler}
      >
        <TabList>
          <Tab>Orders</Tab>
          <Tab>Masters</Tab>
          <Tab>Users</Tab>
          <Tab>Cities</Tab>
        </TabList>
        <TabPanel>
          <Card header="Orders management" >
            <OrdersBlock />
          </Card>
        </TabPanel>
        <TabPanel>
          <Card header="Masters management" >
            <MastersBlock />
          </Card>
        </TabPanel>
        <TabPanel>
          <Card header="Users management" >
            <UsersBlock />
          </Card>
        </TabPanel>
        <TabPanel>
          <Card header="Cities management" >
            <CitiesBlock />
          </Card>
        </TabPanel>
      </Tabs>

      <HumanizedErrorMessageButton />
    </div>
  );
};


export default AdminPage;
