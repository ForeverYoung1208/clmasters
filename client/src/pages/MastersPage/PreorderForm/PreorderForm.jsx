// foreign libs
import React, { useState, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import DatePicker from "react-datepicker";
import { registerLocale } from  "react-datepicker";
import uk from 'date-fns/locale/uk';
import { setHours, setMinutes, isSameDay, endOfDay, startOfDay} from 'date-fns'

// my UI
import { Button } from '../../../components/Button/Button';
import { Form } from '../../../components/Form/Form';

// my services
import Validator from '../../../shared/js/validator';
import { longerThan, isEmail, entered, selected } from '../../../shared/validators/baseValidator'

// store
import { setErrorMessage, postPreorder } from '../../../store/actions/main';

//sytyles
import "react-datepicker/dist/react-datepicker.css";
import "./PreorderForm.scss"

registerLocale('uk', uk)

export const PreorderForm = (props) => {
  const history = useHistory()  
  const [formData, setFormData] = useState({
    name:'',
    email:'',
    orderDateTime: '',
    clockType:null,
    city: null,
    minTime: new Date()     //now!
  })
  const dispatch = useDispatch()
  const voc = useSelector(state => state.voc)
  const loaders = useSelector(state => state.main.loaders)
  const isLoading = loaders?.preorder

  const [validationErrors, setValidationErrors] = useState()

  useEffect(()=>{
    if(!voc){ 
      dispatch(setErrorMessage('Sorry, database is out of order... try some time later...'))
      history.push('/info')
      return;
    }
    // eslint-disable-next-line
  },[voc])

  const cities = [{id:-1}, ...voc.cities];
  const clocks = [{id:-1}, ...voc.clocks];

  useEffect(() => {
    
    validate('orderDateTime')
    // eslint-disable-next-line    
  }, [formData.orderDateTime])
  
  

  const changeDateHandler = (value) => {
    const minTime = isSameDay(value, new Date())
      ? new Date()
      : startOfDay(new Date())

    setFormData({
      ...formData,
      orderDateTime: value,
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
      cityId: formData.city,
      clockTypeId: formData.clockType,
      repairTime: voc.clocks.find((c)=>c.id === +formData.clockType)?.repairTime,
      email: formData.email,
      name: formData.name,
      orderDateTime: formData.orderDateTime
    }

    dispatch(postPreorder(preorder))

  };  

  const validator = new Validator(
    [{
      fieldName: 'name', 
      tests:[ longerThan(2) ]
    }, {
      fieldName: 'email', 
      tests:[ isEmail ]
    },{
      fieldName: 'orderDateTime', 
      tests:[ entered ]
    },{
      fieldName: 'clockType', 
      tests:[ selected ]
    },{
      fieldName: 'city', 
      tests:[ selected ]
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

        <label className='preorder-form__form-label' htmlFor="clockType">Clock size:</label>
        <select className='form-select' name="clockType" id="clockType" 
          value={formData?.clockType?.value} 
          onChange={changeHandler} 
          disabled={isLoading} 
          onBlur =  {()=>validate('clockType')}
        >
          { clocks?.map((c) => 
          <option key={c.id} value = {c.id}>
            {c.type} {c.comment}
            {c.id === -1
              ? 'Select clock type, please'
              : `, repair time: ${voc.clocks?.find((cl)=>cl.id===c.id)?.repairTime}`
            }
          </option>   )}

        </select>
        <div className='preorder-form__validation-error'>{validationErrors?.clockType}</div>        


        <label className='preorder-form__form-label' htmlFor="City">City:</label>
        <select className='form-select' name="city" id="city" 
          placeholder = 'select a city'
          value={formData?.city?.value} 
          onChange={changeHandler} 
          disabled={isLoading}
          onBlur =  {()=>validate('city')}
          >
          { cities?.map((city) => 
          <option key={city.id} value = {city.id}>
            {city.name} {city.comment}
            {city.id === -1 && 'Select a city, please'
            }
          </option>   )}
        </select>
        <div className='preorder-form__validation-error'>{validationErrors?.city}</div>        
        <label htmlFor="Date">Desired date and time:</label>
        <DatePicker 
          selected={formData.orderDateTime}
          placeholderText="Choose date and time"
          className='form-input'
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


        <Button type="submit" disabled={isLoading||!validationErrors?.isAllValid}>Submit information</Button>
      </Form>    
    </>
  )
};
