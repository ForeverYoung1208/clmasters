import React, { useEffect } from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import PreorderForm from './PreorderForm/PreorderForm'
import OrderForm from './OrderForm/OrderForm'
import { makeStyles } from '@material-ui/core'
import {
  clearFoundMasters,
  forgetPreorder,
  memoizePreorder,
  postPreorder,
  setRegisteredOrder,
} from '../../store/actions/preorders'
import { postOrder } from '../../store/actions/orders'
import { redirectTo } from '../../store/actions/main'
import { ORDERS_POST_FULFILLED } from '../../store/actions/actionTypes/orders'
import { normalizeFormSubmitError } from '../../shared/js/normalizeFormSubmitError'
import { SubmissionError } from 'redux-form'
import { PREORDERS_POST_REJECTED } from '../../store/actions/actionTypes/preorders'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
}))

const MastersPage = () => {
  const { foundMasters, preorder: memoizedPreorder } = useSelector(
    ({ preorders }) => preorders
  )
  const history = useHistory()
  const dispatch = useDispatch()
  const classes = useStyles()

  useEffect(() => {
    if (!!foundMasters && foundMasters[0]) {
      history.push('/masters/order')
    } else {
      history.push('/masters/preorder')
    }
  }, [foundMasters, history])

  const handleSubmitOrder = async ({ masterId }) => {
    const result = await dispatch(
      postOrder({ order: { ...memoizedPreorder, masterId } })
    )
    if (result.type === ORDERS_POST_FULFILLED) {
      dispatch(setRegisteredOrder(result.payload))
      dispatch(forgetPreorder())
      dispatch(clearFoundMasters())
      dispatch(redirectTo('/info'))
    }
  }

  const handleSubmitPreorder = async (preorder) => {
    dispatch(memoizePreorder(preorder))
    const result = await dispatch(postPreorder(preorder))
    if (result.type === PREORDERS_POST_REJECTED) {
      const formSubmitError = normalizeFormSubmitError(result.payload?.errors)
      throw new SubmissionError(formSubmitError)
    }
  }

  return (
    <div className={classes.root}>
      <Switch>
        <Route path="/masters/preorder">
          <PreorderForm onSubmit={handleSubmitPreorder} />
        </Route>
        <Route path="/masters/order">
          <OrderForm onSubmit={handleSubmitOrder} />
        </Route>
      </Switch>
    </div>
  )
}

export default MastersPage
