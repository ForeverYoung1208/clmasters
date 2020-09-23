import React from 'react'
import { useEffect } from 'react'
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


const AdminPage = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAdmindata())
  },[dispatch])
  return (
    <div className="adminPage">
      <Tabs>
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
    </div>
  );
};


export default AdminPage;
