
export const minLength = min => value =>
  value && value.length <= min
    ? `Must be ${min} characters or less`
    : undefined

export const isEmail = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined


export const selected = (data) => 
  !data || data < 0
    ? 'Must be selected.'
    : undefined

export const required = value => value
  ? undefined
  : 'Required'    
