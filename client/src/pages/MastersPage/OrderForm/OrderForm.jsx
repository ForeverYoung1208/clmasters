// foreign libs
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { Button } from '../../../components/Button/Button';
import { Form } from '../../../components/Form/Form';
import { validators } from '../../../shared/validators/baseValidator';
import { RadioGroup, RadioButton } from 'react-radio-buttons'

// import "./OrderForm.scss"

let OrderForm = ({handleSubmit}) => {
  const dispatch = useDispatch()
  const { preorderResult: freeMasters, preorder } = useSelector(store => store.main)
  
  const RenderFieldRadioGroup = ({ className, input, meta, options }) => {
    const changeHandler = (selection) => {
      console.log('[selection]', selection)
      input.onChange(selection)
    }
    return (
      <RadioGroup onChange={changeHandler} className = 'teeeest'>
        {
          options?.map((option) =>
            <RadioButton
              key={option.id}
              value={String(option.id)}
              rootColor='#fff'
              pointColor='#000'
            >
              {option.name}
            </RadioButton>
          )
        }
      </RadioGroup>
    )
  }

  return(
    <>
      {freeMasters?.length > 0
        ? <Form onSubmit={handleSubmit} className="order-form">
            <Field
              name='masterId'
              component={RenderFieldRadioGroup}
              options={freeMasters}
              className='order-form__input-field'
              validate={[ validators.required ]}
            />
          <Button>Submit</Button>
        </Form>  
        : <div>
            No free masters in the city on time
          </div>
      }
      
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