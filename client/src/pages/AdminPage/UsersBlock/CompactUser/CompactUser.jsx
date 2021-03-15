import React from 'react'
import CompactItemRow from '../../../../components/CompactItemRow/CompactItemRow'

const CompactUser = ({ row }) => {
  const shownData = ['id', 'name', 'email', 'isAdmin']
  return (
    <div>
      {shownData.map((key) => (
        <CompactItemRow key={key} label={key} value={row[key]} />
      ))}
    </div>
  )
}
export default CompactUser
