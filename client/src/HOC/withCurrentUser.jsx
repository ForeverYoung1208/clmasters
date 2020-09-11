import React from 'react'
import { useSelector } from 'react-redux'

const withCurrentUser = (Component) => (props) => {
  const currentUser = useSelector(store => store.auth.user)

  return (
    <Component currentUser={currentUser} {...props}/>
  )
}

export default withCurrentUser