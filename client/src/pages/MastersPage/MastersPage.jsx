import React, { useEffect } from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Card } from '../../components/Card/Card'
import PreorderForm from './PreorderForm/PreorderForm'
import OrderForm from './OrderForm/OrderForm'
import { makeStyles } from '@material-ui/core'
// import { postOrder } from '../../store/actions/main';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
}))

const MastersPage = () => {
  const { preorderResult, preorder } = useSelector((state) => state.main)
  const history = useHistory()
  const dispatch = useDispatch()
  const classes = useStyles()

  useEffect(() => {
    if (!preorderResult) {
      history.push('/masters/preorder')
    } else {
      history.push('/masters/order')
    }
  }, [preorderResult, history])

  const handleSubmitOrder = (masterId) => {
    alert(`dispatch(postOrder({ ${masterId}, masterId }))`)
  }
  
  const handleSubmitPreorder = (preorder) => {
    console.log('[preorder]', preorder)
  }
  

  return (
    <div className={classes.root}>
      <Switch>
        <Route path="/masters/preorder">
          <PreorderForm onSubmit={ handleSubmitPreorder}/>
        </Route>
        <Route path="/masters/order">
          <Card header="Please choose master and submit your order">
            <OrderForm onSubmit={handleSubmitOrder} />
          </Card>
        </Route>
      </Switch>
    </div>
  )
}

export default MastersPage
