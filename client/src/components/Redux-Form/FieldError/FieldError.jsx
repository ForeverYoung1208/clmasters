import React from "react";
export const FieldError = ({ meta: { touched, error, warning } }) => (
  <>
    { touched && (error || warning) &&
      <div className="form__error">
        {(error && <span>{error}</span>) || (warning && <span>{warning}</span>)}
      </div>
    }
  </>
)