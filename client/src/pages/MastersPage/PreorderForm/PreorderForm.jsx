import React, { useState } from 'react';
import { Button } from '../../../components/Button/Button';
import { Form } from '../../../components/Form/Form';
import { useAPI } from '../../../hooks/useAPI';

import DatePicker from "react-datepicker";
import { registerLocale } from  "react-datepicker";
import uk from 'date-fns/locale/uk';

import "react-datepicker/dist/react-datepicker.css";
import "./PreorderForm.scss"

registerLocale('uk', uk)

export const PreorderForm = (props) => {
  const [formData, setFormData] = useState({
    email:'',
    name:'',
    orderDateTime: ''
  })
  const {API, isLoading} = useAPI({env:process.env.NODE_ENV})
  
  const changeHandler = (e) =>{
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const changeDateHandler = (value) => {
    setFormData({
      ...formData,
      orderDateTime: value
    })
  }

  const submitHandler = async (e) => {
    e.preventDefault()    
    console.log(formData);

  };  
  return(
    <>
      <Form onSubmit={submitHandler} className = "preorder-form">
        <label className='mastersPage__form-label' htmlFor="name">Enter your name:</label>
        <input className='form-input' type="text" name="name" id="name"  onChange={changeHandler} disabled={isLoading} />

        <label className='mastersPage__form-label' htmlFor="email">Enter your email:</label>
        <input className='form-input'type="email" name="email" id="email" onChange={changeHandler} disabled={isLoading} />

        <label className='mastersPage__form-label' htmlFor="clockSize">Clock size:</label>
        <select className='form-select' name="clockSize" id="clockSize" onChange={changeHandler} disabled={isLoading} >
          <option value='small'>small</option>
          <option value='medium'>medium</option>
          <option value='big'>big</option>
        </select>

        {/* <input type="text" name="clockSize" id="clockSize" onChange={changeHandler} disabled={isLoading} /> */}

        <label className='mastersPage__form-label' htmlFor="City">City:</label>
        <input className='form-select' type="text" name="city" id="city" onChange={changeHandler} disabled={isLoading} />
        
        <label htmlFor="Date">Desired date and time:</label>
        <DatePicker 
          selected = {formData.orderDateTime}
          placeholderText="Choose date and time"
          className = 'form-input'
          onChange={changeDateHandler}
          dateFormat = "dd.MM.yyyy HH:mm"
          locale={uk}
          timeIntervals={60}
          showTimeSelect
        />

        <Button type="submit" disabled={isLoading}>Submit information</Button>
      </Form>    
    </>
  )
};
