import React from 'react';
import PT from 'prop-types';

import './Button.scss';

export const Button = (props) => {
    return (
      <button onClick={props.onClick} className = "btn-sm">
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
