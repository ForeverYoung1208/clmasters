import React from 'react';
import PT from 'prop-types';

import './Button.scss';

export const Button = (props) => {
  
  const { className, ...restProps } = props

  return (
    <button {...restProps} className={"btn-sm "+className}>
      {props.children}
    </button>
  );
};

Button.propTypes = {
  onClick: PT.func,
  children: PT.oneOfType([
    PT.arrayOf(PT.node),
    PT.node
  ]).isRequired
};
