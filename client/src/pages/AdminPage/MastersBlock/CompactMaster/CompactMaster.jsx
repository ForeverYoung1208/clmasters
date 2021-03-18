import React from 'react'
import CompactItemRow from '../../../../components/CompactItemRow/CompactItemRow'

const CompactMaster = ({ row }) => {
  const shownData = ['id', 'name', 'rating', 'hourRate', 'cityName', 'comment', 'isActive']
  return (
    <div>
      {shownData.map((key) => (
        <CompactItemRow key={key} label={key} value={String(row[key])} />
      ))}
    </div>
  )
}
export default CompactMaster
