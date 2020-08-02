import React, { useState } from 'react';

import { Card } from '../../components/Card/Card';
import { Button } from '../../components/Button/Button';
import { useAPI } from '../../hooks/useAPI';

import './MastersPage.scss';

const OrderPage = () => {

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
    const user = await API.registerUser(formData)
    console.log('[user]', user);

    // TODO: stopped here 

  };


  
  return (
    <div className="mastersPage">
      <Card
        header = "Hi! please, introduce yourself!"
      >  
        <form>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" onChange={changeHandler}  disabled={isLoading}/>

          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name"  onChange={changeHandler}  disabled={isLoading}/>

          <Button type="button" onClick={submitHandler} disabled={isLoading}>Send data</Button>
        </form>
      </Card>
    </div>
  );
};

OrderPage.propTypes = {
    
};

export default OrderPage;
