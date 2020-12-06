export const minLength = min => value =>
  value && value.length <= min
    ? `Must be longer than ${min} characters`
    : undefined

export const minLength2 = (value) =>
  value && value.length <= 2
    ? `Must be longer than 2 characters`
    : undefined

export const isEmail = (value) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined


export const selected = (data) => {
  return !data || data < 0
    ? 'Must be selected.'
    : undefined
}

export const required = (value) => value
  ? undefined
  : 'Required'    

export const validators = {
  minLength,
  minLength2,
  isEmail,
  selected,
  required
}
