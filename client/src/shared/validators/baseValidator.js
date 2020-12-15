// arguments of this validator defined by the redux-form validator call
export function minLength(value, obj, properties, fieldName, minLimit = 2) {
  if (value && value.length <= minLimit) {
    return `Must be longer than ${minLimit} characters`
  } else {
    return null
  }
}

export const isEmail = (value) => {
  if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return 'Invalid email address'
  } else {
    return null
  }
}

export const selected = (data) => {
  if (!data || data < 0) {
    return 'Must be selected.'
  } else {
    return null
  }
}

export const required = (value) => {
  if (!value && value !== 0) {
    return 'Required'
  } else {
    return null
  }
}

export const validators = {
  minLength,
  isEmail,
  selected,
  required,
}
