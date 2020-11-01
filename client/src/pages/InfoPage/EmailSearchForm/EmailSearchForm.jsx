import React from "react";
import { Field, reduxForm } from "redux-form";
import { Button } from "../../../components/Button/Button";
import { Form } from "../../../components/Form/Form";
import { RenderFieldInput } from "../../../components/ReduxForm/RenderFieldInput/RenderFieldInput";
import { validators } from "../../../shared/validators/baseValidator";

let EmailSearchForm= ({ handleSubmit, invalid }) => {
  return (
    <Form onSubmit={handleSubmit}>
      <label
        htmlFor="searchString"
        className="orders-info__search-form__label"
      >
        Enter email to search for registered orders:
      </label>
      <Field
        name="searchString"
        className={`form-input ${invalid && 'form-input--invalid'}`}
        component={RenderFieldInput}
        validate={[validators.isEmail]}
      />
      <Button type="submit">Search</Button>
    </Form>
  );
}

EmailSearchForm = reduxForm({
  form: 'emailSearch'
})(EmailSearchForm)

export default EmailSearchForm