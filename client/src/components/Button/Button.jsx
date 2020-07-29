import React from 'react';
import PT from 'prop-types';

import './Button.scss';

export const Button = (props) => {
    return (
      <button type="button" onClick={props.onClick} className = "btn-sm">
        {props.children}
      </button>
    );
};

Button.propTypes = {
  onClick: PT.func.isRequired,
  children: PT.oneOfType([
    PT.arrayOf(PT.node),
    PT.node
  ]).isRequired
};
