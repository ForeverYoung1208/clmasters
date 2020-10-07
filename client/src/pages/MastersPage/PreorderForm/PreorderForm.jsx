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

// my services
import Validator from '../../../shared/js/validator';
import { validators } from '../../../shared/validators/baseValidator'

// store
import { setErrorMessage, postPreorder } from '../../../store/actions/main';

//sytyles
import "react-datepicker/dist/react-datepicker.css";
import "./PreorderForm.scss"
import { Emptyspace } from '../../../components/Emptyspace/Emptyspace';

registerLocale('uk', uk)

export const PreorderForm = () => {
  const history = useHistory()  
  const dispatch = useDispatch()
  const { loaders, preorder: prevPreorder } = useSelector(state => state.main)
  const voc = useSelector(state => state.voc)

  const [formData, setFormData] = useState({
    name: prevPreorder.name || '',
    email: prevPreorder.email || '',
    orderDateTime: prevPreorder.orderDateTime || '',
    clockTypeId: prevPreorder.clockTypeId || '-1',
    cityId: prevPreorder.cityId || '-1',
    minTime: new Date()     //now!
  })
 
  const [validationErrors, setValidationErrors] = useState()
  const isLoading = loaders?.preorder


  useEffect(()=>{
    if(!voc){ 
      dispatch(setErrorMessage('Sorry, database is out of order... try some time later...'))
      history.push('/info')
      return;
    }
  },[voc, history, dispatch])

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
      cityId: formData.cityId,
      clockTypeId: formData.clockTypeId,

      // perhaps, it isn't necessary, try to rid of it
      // repairTime: voc.clocks.find((c) => c.id === +formData.clockType)?.repairTime,

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
        <label className='preorder-form__form-label' htmlFor="name">Enter your name:</label>
        <input className='form-input' type="text" name="name" id="name"  
          value={formData.name} 
          onChange={changeHandler} 
          disabled={isLoading} 
          onBlur = { ()=>validate('name')}
        />
        <div className='preorder-form__validation-error'>{validationErrors?.name || <Emptyspace/>}</div>

        <label className='preorder-form__form-label' htmlFor="email">Enter your email:</label>
        <input className='form-input'type="email" name="email" id="email" 
          value={formData.email} 
          onChange={changeHandler} 
          disabled={isLoading} 
          onBlur =  {()=>validate('email')}
        />

        <div className='preorder-form__validation-error'>{validationErrors?.email || <Emptyspace/>}</div>        

        <label className='preorder-form__form-label' htmlFor="clockTypeId">Clock size:</label>
        <select className='form-select' name="clockTypeId" id="clockType" 
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
              : `, repair time: ${voc.clocks?.find((cl)=>cl.id===c.id)?.repairTime || <Emptyspace/>}`
            }
          </option>   )}

        </select>
        <div className='preorder-form__validation-error'>{validationErrors?.clockType || <Emptyspace/>}</div>        


        <label className='preorder-form__form-label' htmlFor="CityId">City:</label>
        <select className='form-select' name="cityId" id="city" 
          placeholder = 'select a city'

/////////////////////////////////////////////////////////////////////////////////
// TODO default values
/////////////////////////////////////////////////////////////////////////////////          
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
        <div className='preorder-form__validation-error'>{validationErrors?.city || <Emptyspace/>}</div>        
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
