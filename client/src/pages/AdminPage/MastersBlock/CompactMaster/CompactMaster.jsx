import React from 'react'
import CompactItemRow from '../../../../components/CompactItemRow/CompactItemRow'

const CompactMaster = ({ row }) => {
  const shownData = ['id', 'name', 'rating', 'cityName', 'comment']
  return (
    <div>
      {shownData.map((key) => (
        <CompactItemRow key={key} label={key} value={row[key]} />
      ))}
    </div>
  )
}
export default CompactMaster
