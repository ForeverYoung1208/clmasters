import React from 'react'

const CompactUser = ({
  row: { id, name, email, isAdmin},
}) => {
  console.log('[isAdmin]', isAdmin)
  return (
    <div className="admin-page__item--compact">
      <div className="admin-page__item--compact__row"><span>Id:</span> <span>{id} </span></div>
      <div className="admin-page__item--compact__row"><span>User:</span> <span>{name} </span></div>
      <div className="admin-page__item--compact__row"><span>E-mail</span> <span>{email} </span></div>
      <div className="admin-page__item--compact__row"><span>Is admin?:</span> <span>{isAdmin ? 'Yes' : 'No'} </span></div>
    </div>
)
}

export default CompactUser
