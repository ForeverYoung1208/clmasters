function Field(f) {
  this.name = f.fieldName
  this.tests = f.tests
  this.error = ''
  
}

export default function Validator(fields){
  this.fields=[]
  fields.forEach( f => {
    this.fields.push( 
      new Field( f ) 
    )
  });

  this.findFieldByName = (name)=> {
    const index = this.fields.findIndex((f)=>f.name === name)
    return this.fields[index]
  }

  this.testField = (fieldName) => {
    let field = this.findFieldByName.call(this,fieldName)

    return function(fieldTotest){
      let errors = '';
      if (field){
        field.tests.forEach( test => errors += test(fieldTotest) ? test(fieldTotest) : '' );
        field.error = errors
      } 
      return !errors
    }
  }

  this.isAllValid = (formData) => {
    const formFields = Object.keys(formData)
    let isAllValid =  formFields.reduce((acc, fieldName)=>{

      let isFieldValid = this.testField(fieldName)(formData[fieldName])
      return(acc && isFieldValid)
    }, true)


    return isAllValid
  }
  
  
}