
  // ///
  // import validator from validator
  // //init
  // validator.fields = [
  //   {fieldName:'name', tests:[function(){'//...'}]},
  //   {fieldName:'email', tests:[function(){'//...'}]},
  // ]
  
  // validator.testField('name')(data) // result: true/false
  // validator.isAllValid // result: true/false
  ///

  // const validate= (fieldName)=>{
  //   switch (fieldName){
      
  //     case 'name':
  //       if (formData.name.length <= 3){
  //         setValidationError({...validationErrors, name: 'Name length must be greater than 3 chars'})
  //       } else {
  //         setValidationError({...validationErrors, name:null})
  //         setFormData({...formData, isValid: !validationErrors.email})
  //       }
  //     break;

  //     case 'email':
  //       if ( !( /\S+@\S+\.\S+/.test(formData.email)) || formData.email.length===0 ){
  //         setValidationError({...validationErrors, email:'Must be an email adress'})
  //       } else {
  //         setValidationError({...validationErrors, email:null})
  //         setFormData({...formData, isValid: !validationErrors.name})
  //       }
  //     break;

  //     default:
  //     break;
  //   }
  // }
