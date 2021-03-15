import React from 'react'
import './CompactItemRow.scss'

const CompactItemRow = ({ label, value }) => (
  <div className="compact-item-row">
    <span>{label}</span> <span>{value} </span>
  </div>
)

export default CompactItemRow
