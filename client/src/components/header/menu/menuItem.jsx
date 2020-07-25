import React from 'react';
import './menuItem.scss';
import PT from 'prop-types';

export const MenuItem = (props) => {

  let clases = ['menu__menuItem']
  if(props.isActive) clases.push('active')

  return (
    props.isShown &&
      <div className={clases.join(' ')} onClick={props.onClick}>
        {props.children}
      </div>
  )
};

MenuItem.propTypes={
  children: PT.node.isRequired,
  isShown: PT.bool.isRequired,
  isActive: PT.bool.isRequired,
  onClick: PT.func.isRequired
}

