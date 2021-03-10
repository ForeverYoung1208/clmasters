import React from 'react'

const CompactMaster = ({
  row: { id, name, rating, cityName, comment },
}) => {
  return (
    <div className="admin-page__item--compact">
      <div className="admin-page__item--compact__row"><span>Id:</span> <span>{id} </span></div>
      <div className="admin-page__item--compact__row"><span>Master:</span> <span>{name} </span></div>
      <div className="admin-page__item--compact__row"><span>Master:</span> <span>{rating} </span></div>
      <div className="admin-page__item--compact__row"><span>User:</span> <span>{cityName} </span></div>
      <div className="admin-page__item--compact__row"><span>Comment:</span> <span>{comment} </span></div>
    </div>
)
}

export default CompactMaster
