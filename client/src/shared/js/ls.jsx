export const LS = (key) =>{
  let value =  localStorage.getItem(key)
  try {
    value = JSON.parse(localStorage.getItem(key))
  } catch (error) {
    value = localStorage.getItem(key);
  }
  if (value === 'undefined') {value = null} ;

   
  return value
}

LS.setItem = function(key,value){
  return localStorage.setItem(key, JSON.stringify(value) )
}

LS.removeItem = function(key){
  return localStorage.removeItem(key)
}