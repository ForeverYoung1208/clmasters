// foreign libs
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { Button } from '../../../components/Button/Button';
import { Form } from '../../../components/Form/Form';
import { RenderFieldSelect } from '../../../components/Redux-Form/RenderFieldSelect/RenderFieldSelect';
import { validators } from '../../../shared/validators/baseValidator';

// import "./OrderForm.scss"

let OrderForm = (props) => {
  const dispatch = useDispatch()
  const { preorderResult: freeMasters, preorder } = useSelector(store => store.main)
  
  
  const submitHandler = async (e) => {
    e.preventDefault() 
    const order = {}
    // dispatch(postOrder(order))
    console.log('[submit handler e]', e)
  }
  
  console.log('[freeMasters]', freeMasters)
  
  return(
    <>
      <Form onSubmit={submitHandler} className="order-form">
        {freeMasters?.length > 0
          ? <Field
              name='masterId'
              component={RenderFieldSelect}
              options={freeMasters}
              className='order-form__input-field'
              validate={[ validators.required ]}
            />
          : `No free masters in the city on time ${preorder.orderDateTime}`
        }
        


        {freeMasters?.length > 0 && <Button>Submit</Button>}
      </Form>  
      
      <NavLink to='/masters/preorder'> 
        <Button> 
          Change preorder data
        </Button>
      </NavLink> 
    </>
  )
};

export default reduxForm(
  {form: "orderForm"}
)(OrderForm)