import React from 'react'

const CompactOrder = ({
  row: { id, clockType, masterName, userName, onTime, comment },
}) => {
  return (
    <div className="admin-page__item--compact">
      <div className="admin-page__item--compact__row"><span>Id:</span> <span>{id} </span></div>
      <div className="admin-page__item--compact__row"><span>Clock:</span> <span>{clockType} </span></div>
      <div className="admin-page__item--compact__row"><span>Master:</span> <span>{masterName} </span></div>
      <div className="admin-page__item--compact__row"><span>User:</span> <span>{userName} </span></div>
      <div className="admin-page__item--compact__row"><span>On time:</span> <span>{onTime} </span></div>
      <div className="admin-page__item--compact__row"><span>Comment:</span> <span>{comment} </span></div>
    </div>
)
}

export default CompactOrder
