import React, { useState } from 'react';
import { Button } from '../../../components/Button/Button';
import { Form } from '../../../components/Form/Form';
import { useAPI } from '../../../hooks/useAPI';

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

  const submitHandler = async (e) => {
    e.preventDefault()    
    alert('under construction')

  };  
  return(
    <>
      <Form onSubmit={submitHandler}>
        <label htmlFor="name">Enter your name:</label>
        <input type="text" name="name" id="name"  onChange={changeHandler} disabled={isLoading} />

        <label htmlFor="email">Enter your email:</label>
        <input type="email" name="email" id="email" onChange={changeHandler} disabled={isLoading} />

        <label htmlFor="clockSize">Clock size:</label>
        <input type="text" name="clockSize" id="clockSize" onChange={changeHandler} disabled={isLoading} />

        <label htmlFor="City">City:</label>
        <input type="text" name="city" id="city" onChange={changeHandler} disabled={isLoading} />
        
        <label htmlFor="Date">Date:</label>
        <input type="text" name="date" id="date" onChange={changeHandler} disabled={isLoading} />

        <label htmlFor="Time">Time:</label>
        <input type="text" name="time" id="time" onChange={changeHandler} disabled={isLoading} />

        <Button type="submit" disabled={isLoading}>Submit information</Button>
      </Form>    
    </>
  )
};
