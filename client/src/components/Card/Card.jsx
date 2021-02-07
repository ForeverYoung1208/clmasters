import React from 'react'
import PT from 'prop-types';

import './Card.scss'

export const Card = (props) => (
  <div className="card">
    <h2>{props.header}</h2>
    {props.children}
  </div>
)

export default Card;
