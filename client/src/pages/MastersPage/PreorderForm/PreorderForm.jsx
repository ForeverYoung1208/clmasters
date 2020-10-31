// foreign libs
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import DatePicker from "react-datepicker";
import { registerLocale } from  "react-datepicker";
import uk from 'date-fns/locale/uk';
import { isSameDay, endOfDay, startOfDay} from 'date-fns'

// my UI
import { Button } from '../../../components/Button/Button';
import { Form } from '../../../components/Form/Form';
import { Emptyspace } from '../../../components/Emptyspace/Emptyspace';

// my services
import Validator from '../../../shared/js/validator';
import { validators } from '../../../shared/validators/baseValidator'
import { apiGetVocabluaries } from '../../../shared/js/api/vocabluaries';

// store
import { setErrorMessage, postPreorder } from '../../../store/actions/main';
import { fetchVocabluariesOk } from '../../../store/actions/vocabluaries';

import "react-datepicker/dist/react-datepicker.css";
import "./PreorderForm.scss"

registerLocale('uk', uk)

export const PreorderForm = () => {
  const history = useHistory()  
  const dispatch = useDispatch()
  const { loaders, preorder: prevPreorder } = useSelector(store => store.main)
  const vocabluaries = useSelector(store => store.vocabluaries)

  const [formData, setFormData] = useState({
    name: prevPreorder?.name || '',
    email: prevPreorder?.email || '',
    orderDateTime: prevPreorder?.orderDateTime || '',
    isOrderDateTimeTouched: false,
    clockTypeId: prevPreorder?.clockTypeId || '-1',
    cityId: prevPreorder?.cityId || '-1',
    minTime: new Date()     //now!
  })
 
  const [validationErrors, setValidationErrors] = useState()
  const isLoading = loaders?.preorder
  const cities = [{id:-1}, ...vocabluaries.cities];
  const clocks = [{ id: -1 }, ...vocabluaries.clocks];
  
  useEffect(() => {
    apiGetVocabluaries().then((res) => {
      dispatch(fetchVocabluariesOk(res.vocabluaries))
    })
  },[dispatch])

  useEffect(()=>{
    if(!vocabluaries){ 
      dispatch(setErrorMessage('data is loading...'))
      return;
    }
  }, [vocabluaries, history, dispatch])
    
  useEffect(() => {
    formData.isOrderDateTimeTouched && validate('orderDateTime')
    // eslint-disable-next-line    
  }, [formData.orderDateTime])

  const changeDateHandler = (value) => {
    const minTime = isSameDay(value, new Date())
      ? new Date()
      : startOfDay(new Date())

    setFormData({
      ...formData,
      orderDateTime: value,
      isOrderDateTimeTouched: true,
      minTime,
    })
   
  }
  
  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  
  const submitHandler = async (e) => {
    e.preventDefault() 

    const preorder =  {
      cityId: formData.cityId,
      clockTypeId: formData.clockTypeId,
      email: formData.email,
      name: formData.name,
      orderDateTime: formData.orderDateTime
    }

    dispatch(postPreorder(preorder))

  };  

  const validator = new Validator(
    [{
      fieldName: 'name', 
      tests:[ validators.required, validators.minLength(2) ]
    }, {
      fieldName: 'email', 
      tests:[ validators.required, validators.isEmail ]
    },{
      fieldName: 'orderDateTime', 
      tests:[ validators.required ]
    },{
      fieldName: 'clockTypeId', 
      tests:[ validators.selected ]
    },{
      fieldName: 'cityId', 
      tests:[ validators.selected ]
    }]
  )

  const validate=(fieldName)=>{
    validator.testField(fieldName)(formData[fieldName])
    setValidationErrors({
      ...validationErrors, 
      [fieldName]: validator.findFieldByName(fieldName).error,
      isAllValid: validator.isAllValid(formData)
    })
  }

  return(
    <>
      <Form onSubmit={submitHandler} className = "preorder-form">
        <label className={'preorder-form__form-label'} htmlFor="name">
          * Enter your name:
        </label>
        <input className={`form-input ${validationErrors?.name && 'form-input--invalid'}`}
          type="text" name="name" id="name"  
          value={formData.name} 
          onChange={changeHandler} 
          disabled={isLoading} 
          onBlur = { ()=>validate('name')}
        />
        <div className='preorder-form__validation-error'>{validationErrors?.name || <Emptyspace/>}</div>

        <label className='preorder-form__form-label' htmlFor="email">* Enter your email:</label>
        <input className={`form-input ${validationErrors?.email && 'form-input--invalid'}`}
          type="email" name="email" id="email" 
          value={formData.email} 
          onChange={changeHandler} 
          disabled={isLoading} 
          onBlur =  {()=>validate('email')}
        />

        <div className='preorder-form__validation-error'>{validationErrors?.email || <Emptyspace/>}</div>        

        <label className='preorder-form__form-label' htmlFor="clockTypeId">* Clock size:</label>
        <select className={`form-select ${validationErrors?.clockTypeId && 'form-input--invalid'}`}
          name="clockTypeId" id="clockType" 
          value={formData.clockTypeId} 
          onChange={changeHandler} 
          disabled={isLoading} 
          onBlur =  {()=>validate('clockTypeId')}
        >
          { clocks?.map((c) => 
          <option key={c.id} value = {c.id}>
            {c.type} {c.comment}
            {c.id === -1
              ? 'Select clock type, please'
              : `, repair time: ${vocabluaries.clocks?.find((cl)=>cl.id===c.id)?.repairTime || <Emptyspace/>}`
            }
          </option>   )}

        </select>
        <div className='preorder-form__validation-error'>{validationErrors?.clockTypeId || <Emptyspace/>}</div>        


        <label className='preorder-form__form-label' htmlFor="cityId">* City:</label>
        <select className={`form-select ${validationErrors?.cityId && 'form-input--invalid'}`}
          name="cityId" id="city" 
          placeholder = 'select a city'

          value={formData.cityId} 
          onChange={changeHandler} 
          disabled={isLoading}
          onBlur =  {()=>validate('cityId')}
          >
          { cities?.map((city) => 
          <option key={city.id} value = {city.id}>
            {city.name} {city.comment}
            {city.id === -1 && 'Select a city, please'
            }
          </option>   )}
        </select>
        <div className='preorder-form__validation-error'>{validationErrors?.cityId || <Emptyspace/>}</div>        
        <label htmlFor="Date">* Desired date and time:</label>
        <DatePicker 
          className={`form-input ${validationErrors?.orderDateTime && 'form-input--invalid'}`}
          selected={formData.orderDateTime}
          placeholderText="Choose date and time"
          minDate={ new Date() }
          minTime={ formData.minTime }
          maxTime={ endOfDay(new Date()) }
          onChange={ changeDateHandler }
          dateFormat = "dd.MM.yyyy HH:mm"
          locale={uk}
          timeIntervals={ 60 }
          showTimeSelect
          onBlur =  {()=>validate('orderDateTime')}          
        />
        <div className='preorder-form__validation-error'>{validationErrors?.orderDateTime}</div>

        <Button type="submit" disabled={isLoading || !validationErrors?.isAllValid}>Submit information</Button>
      </Form>    
    </>
  )
};
