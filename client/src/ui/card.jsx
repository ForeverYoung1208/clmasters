import React from 'react'
import './card.scss'

export const Card = (props)=> (
  <div className="card">
    <h2>{props.header}</h2>
    {props.children}
  </div>
)
