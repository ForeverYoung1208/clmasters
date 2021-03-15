import React from 'react'
import CompactItemRow from '../../../../components/CompactItemRow/CompactItemRow'

const CompactOrder = ({ row }) => {
  const shownData = [
    'id',
    'clockType',
    'masterName',
    'userName',
    'onTime',
    'comment',
  ]
  return (
    <div>
      {shownData.map((key) => (
        <CompactItemRow key={key} label={key} value={row[key]} />
      ))}
    </div>
  )
}

export default CompactOrder
