export const longerThan = (len) => {
  return function (data) {
    if (!data || data.length <= len) return (`Must be more than ${len} chars!`)
  }
}
  
export const isEmail = (data) => {
  if (!(/\S+@\S+\.\S+/.test(data))) return ('Must be an email adress')
}
  
export const entered = (data) => {
    if( !data ) return('Must be specified.')
}
  
export const selected = (data) => {
  if (!data || data < 0) return ('Must be selected.')
}