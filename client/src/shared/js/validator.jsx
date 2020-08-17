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

    return function(dataToTest){
      let errors = '';
      field.tests.forEach( test => errors += test(dataToTest) ? test(dataToTest) : '' );
      field.error = errors
      return !errors
    }
  }

  this.isAllValid = () => {
    const res =  this.fields.reduce((acc, curr)=>{
      console.log('[==accumulator==]', acc, curr, acc && !curr.error );
      return(acc && !curr.error)
    }, true)
    return res
  
  }
  
  
}