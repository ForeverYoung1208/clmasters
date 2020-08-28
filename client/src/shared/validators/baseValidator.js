const baseValidator = {
  longerThan: function(len){
    return function (data) {
      if(!data || data.length<=len) return(`Must be more than ${len} chars!`)
    }
  },
  isEmail: function(data) {
    if(!( /\S+@\S+\.\S+/.test(data)) ) return('Must be an email adress')
  },
  entered: function (data) {
    if( !data ) return('Must be specified.')
  },
  selected: function (data) {
    if( !data || data < 0 ) return('Must be selected.')
  },
}

export default baseValidator;