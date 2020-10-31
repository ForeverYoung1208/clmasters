import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { Button } from '../../../components/Button/Button';
import { Form } from '../../../components/Form/Form';
import { validators } from '../../../shared/validators/baseValidator';
import { RenderFieldRadioGroup } from '../../../components/ReduxForm/RenderFieldRadioGroup/RenderFieldRadioGroup';

let OrderForm = ({handleSubmit}) => {
  const { preorderResult: freeMasters } = useSelector(store => store.main)
  const options = freeMasters?.map((master) => ({
    id: master.id,
    name: `${master.name}, rating:${master.rating} `
  }))
  
  return(
    <div className="order-form">
      {freeMasters?.length > 0
        ? <Form onSubmit={handleSubmit} className="order-form__form">
            <Field
              name='masterId'
              component={RenderFieldRadioGroup}
              options={options}
              className='order-form__radio-group'
              validate={[ validators.required ]}
            />
          <Button>Submit</Button>
        </Form>  
        : <div>
            No free masters in the given city at specified time was found.
          </div>
      }
      
      <NavLink to='/masters/preorder' className = 'order-form__change-link'> 
        <Button> 
          Change preorder data
        </Button>
      </NavLink> 
    </div>
  )
};

export default reduxForm(
  {form: "orderForm"}
)(OrderForm)