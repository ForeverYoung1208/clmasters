import React from 'react'
import EditDeleteBtns from '../../../../components/EditDeleteBtns/EditDeleteBtns'

import './CompactOrder.scss'

const CompactOrder = ({
  row: { id, clockType, MasterName, userName, onTime, comment },
}) => {
  return (
    <>
      <div className="compact-order">
        <div className="compact-order__row">Id: {id} </div>
        <div className="compact-order__row">Clock: {clockType} </div>
        <div className="compact-order__row">Master: {MasterName} </div>
        <div className="compact-order__row">User: {userName} </div>
        <div className="compact-order__row">On time: {onTime} </div>
        <div className="compact-order__row">Comment: {comment} </div>
      </div>
      <div>
        {' '}
        <EditDeleteBtns />
      </div>
    </>
  )
}

export default CompactOrder
