import React, { useState, useContext, useEffect} from 'react';
import DatePicker from "react-datepicker";
import { registerLocale } from  "react-datepicker";
import uk from 'date-fns/locale/uk';

import { Button } from '../../../components/Button/Button';
import { Form } from '../../../components/Form/Form';
import { useAPI } from '../../../hooks/useAPI';
import { GlobalDataContext } from '../../../context/globalDataContext';
import Validator from '../../../shared/js/validator';

import "react-datepicker/dist/react-datepicker.css";
import "./PreorderForm.scss"


registerLocale('uk', uk)

export const PreorderForm = (props) => {
  const [formData, setFormData] = useState({
    name:'',
    email:'',
    orderDateTime: ''
  })
  const [validationErrors, setValidationErrors] = useState()
  const {API, isLoading} = useAPI({env:process.env.NODE_ENV})
  const {globalData} = useContext(GlobalDataContext)
  const cities = globalData?.voc.cities;
 
  const changeDateHandler = (value) => {
    setFormData({
      ...formData,
      orderDateTime: value
    })
  }
  
  const changeHandler = (e) =>{
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  const submitHandler = async (e) => {
    e.preventDefault()    
    // post data to API 
    // on success, set globalData
    // on fail, show error
    console.log(formData);
  };  

  const validator = new Validator(
    [{
      fieldName: 'name', 
      tests:[ data =>{
        if(!data || data.length<=2) return('Name must be more than 2 chars!')
      }]
    }, {
      fieldName: 'email', 
      tests:[ data =>{
        if(!( /\S+@\S+\.\S+/.test(data)) ) return('Must be an email adress')
      }]
    },{
      fieldName: 'orderDateTime', 
      tests:[ data =>{
        if( !data ) return('Date and Time must be specified.')
      }]
    }]
  )

  const validate=(fieldName)=>{
    validator.testField(fieldName)(formData[fieldName])
    let error = validator.findFieldByName(fieldName).error
    setValidationErrors({
      ...validationErrors, 
      [fieldName]:error,
      isAllValid: validator.isAllValid()
    })
    console.log('[validator.isAllValid]', validator.isAllValid());
  }

  

  return(
    <>
      <Form onSubmit={submitHandler} className = "preorder-form">
        <label className='preorder-form__form-label' htmlFor="name">Enter your name:</label>
        <input className='form-input' type="text" name="name" id="name"  
          onChange={changeHandler} 
          disabled={isLoading} 
          onBlur = { ()=>validate('name')}
        />
        <div className='preorder-form__validation-error'>{validationErrors?.name}</div>

        <label className='preorder-form__form-label' htmlFor="email">Enter your email:</label>
        <input className='form-input'type="email" name="email" id="email" 
          onChange={changeHandler} 
          disabled={isLoading} 
          onBlur =  {()=>validate('email')}
        />

        <div className='preorder-form__validation-error'>{validationErrors?.email}</div>        

        <label className='preorder-form__form-label' htmlFor="clockSize">Clock size:</label>
        <select className='form-select' name="clockSize" id="clockSize" onChange={changeHandler} disabled={isLoading} >
          <option value='small'>small</option>
          <option value='medium'>medium</option>
          <option value='big'>big</option>
        </select>

        <label className='preorder-form__form-label' htmlFor="City">City:</label>
        <select className='form-select' name="city" id="city" value={formData?.city?.value} onChange={changeHandler} disabled={isLoading}>
          { cities?.map((city) => <option key={city.id} value = {city.id}>{city.name} ({city.comment})</option>   )}
        </select>
        
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
          onBlur =  {()=>validate('orderDateTime')}          
        />
        <div className='preorder-form__validation-error'>{validationErrors?.orderDateTime}</div>


        <Button type="submit" disabled={isLoading||!validationErrors?.isAllValid}>Submit information</Button>
      </Form>    
    </>
  )
};
