import React, { useState } from 'react';
import { Button } from '../../../components/Button/Button';
import { Form } from '../../../components/Form/Form';
import { useAPI } from '../../../hooks/useAPI';

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export const PreorderForm = (props) => {
  const [formData, setFormData] = useState({
    email:'',
    name:'',
  })
  const {API, isLoading} = useAPI({env:process.env.NODE_ENV})
  
  const changeHandler = (e) =>{
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const changeDateHandler = (e) => {
    return console.log('[e]', e);
  }

  const submitHandler = async (e) => {
    e.preventDefault()    
    alert('under construction')

  };  
  return(
    <>
      <Form onSubmit={submitHandler} className = "preorder-form">
        <label htmlFor="name">Enter your name:</label>
        <input type="text" name="name" id="name"  onChange={changeHandler} disabled={isLoading} />

        <label htmlFor="email">Enter your email:</label>
        <input type="email" name="email" id="email" onChange={changeHandler} disabled={isLoading} />

        <label htmlFor="clockSize">Clock size:</label>
        <select name="clockSize" id="clockSize" onChange={changeHandler} disabled={isLoading} >
          <option value='small'>small</option>
          <option value='medium'>medium</option>
          <option value='big'>big</option>
        </select>

        {/* <input type="text" name="clockSize" id="clockSize" onChange={changeHandler} disabled={isLoading} /> */}

        <label htmlFor="City">City:</label>
        <input type="text" name="city" id="city" onChange={changeHandler} disabled={isLoading} />
        
        <label htmlFor="Date">Date:</label>
        <DatePicker 
          onChange={changeDateHandler}
          dateFormat = "dd.MM.yyyy"
          showTimeSelect
          dateFormat="Pp"          
        />

        {/* <input type="date" name="date" id="date" onChange={changeHandler} disabled={isLoading} /> */}

        {/* <label htmlFor="Time">Time:</label>
        <input type="text" name="time" id="time" onChange={changeHandler} disabled={isLoading} /> */}

        <Button type="submit" disabled={isLoading}>Submit information</Button>
      </Form>    
    </>
  )
};
