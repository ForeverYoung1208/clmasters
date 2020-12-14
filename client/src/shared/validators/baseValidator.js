export const minLength2 = (value) => {
  if (value && value.length <= 2) {
    return `Must be longer than 2 characters`
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
  if (!value && value !== 0 ) {
    return 'Required'
  } else {
    return null
  }
}

export const validators = {
  minLength2,
  isEmail,
  selected,
  required,
}
