import React from 'react'
import { useSelector } from 'react-redux'

export const withHumanizeError = (ErrorComponent) => (props) => {

  const errorsTranslations = [
    ['ForeignKeyConstraint', 'Can\'t delete: record is associated with another data'],
    ['email must be unique', 'Email must be unique'],
    ['email must be unique', 'Email must be unique'],
    ['The master is busy at given time', 'The master is busy at given time']

  ]

  const rawMessage = useSelector(({ main: { errorMessage } }) => errorMessage)
  const translations = errorsTranslations.find((et) => rawMessage?.match(et[0]))

  return <ErrorComponent  customErrorMessage = {translations && translations[1]} {...props}/>
}

