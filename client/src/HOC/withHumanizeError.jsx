import React from 'react'
import { useSelector } from 'react-redux'

export const withHumanizeError = (ErrorComponent) => (props) => {

  const errorsTranslations = [
    ['ForeignKeyConstraint', 'Can\'t delete: record is associated with another data'],

  ]

  const rawMessage = useSelector(({ main: { errorMessage } }) => errorMessage)
  const translation = errorsTranslations.find((et) => et[0].test(rawMessage))

  return <ErrorComponent  customErrorMessage = {translation[1]} {...props}/>
}

