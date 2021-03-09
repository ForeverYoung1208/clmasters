import React from 'react'
import EditDeleteBtns from '../../../../components/EditDeleteBtns/EditDeleteBtns'

import './CompactOrder.scss'

const CompactOrder = ({
  row: { id, clockType, masterName, userName, onTime, comment },
}) => {
  return (
    <div className="compact-order">
      <div className="compact-order__row"><span>Id:</span> <span>{id} </span></div>
      <div className="compact-order__row"><span>Clock:</span> <span>{clockType} </span></div>
      <div className="compact-order__row"><span>Master:</span> <span>{masterName} </span></div>
      <div className="compact-order__row"><span>User:</span> <span>{userName} </span></div>
      <div className="compact-order__row"><span>On time:</span> <span>{onTime} </span></div>
      <div className="compact-order__row"><span>Comment:</span> <span>{comment} </span></div>
    </div>
)
}

export default CompactOrder
